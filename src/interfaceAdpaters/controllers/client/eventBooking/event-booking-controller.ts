import { IEventBookingController } from "@entities/controllerInterfaces/client/eventBooking/event-booking-controller.interface";
import { ICreateBookingUseCase } from "@entities/useCaseInterfaces/client/creating-booking-usercase.interface";
import { IHandleEventWebHookUseCase, ITicketPurchase } from "@entities/useCaseInterfaces/client/event-webhook-handle.usecase.interface";
import { IHandleServiceBookingWebhookUseCase } from "@entities/useCaseInterfaces/client/handle-service-booking-webhook.usecase.interface";
import stripe from "@frameworks/stripe/stripe-client";
import { CustomRequest } from "@middlewares/auth.middleware";
import { config } from "@shared/config";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { BookingCreationDTO } from "@shared/dtos/event-booking.dto";
import { Request, Response } from "express";
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";


@injectable()
export class EventBookingController implements IEventBookingController{
     
    constructor(
        @inject("IHandleEventWebhookUseCase") private _eventWebHookUseCase : IHandleEventWebHookUseCase,
        @inject("ICreateBookingUseCase") private _createBookingUseCase : ICreateBookingUseCase,
        @inject("IHandleServiceBookingWebhookUseCase") private _HandleServiceBookingWebhookUseCase : IHandleServiceBookingWebhookUseCase

    ){}


   async createBooking(req: Request, res: Response): Promise<void> {

         const { eventId, currency, totalAmount, tickets }: BookingCreationDTO = req.body;
        

           const validTickets = tickets.filter(t => t.quantity > 0);

            if (validTickets.length === 0) {
                res.status(HTTP_STATUS.BAD_REQUEST)
                .json({success:false,message:ERROR_MESSAGES.NO_VALID_TICKETS_SELECTED_ERROR})
            }


        const userId = (req as CustomRequest).user.id
         
           const paymentIntent = await this._createBookingUseCase.execute(
                "event",
                totalAmount,
                currency,
                eventId,
                userId,
                validTickets 
            );

         res.status(HTTP_STATUS.OK)
         .json({success:true,clientSecret:paymentIntent.client_secret});
   }

async handleWebHook(req: Request, res: Response): Promise<void> {
  const sig = req.headers["stripe-signature"] as string;
  const event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webHookSecrect!);

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const bookingType = paymentIntent.metadata?.bookingType;

   

    if (bookingType === "event") {
      const { eventId, userId, tickets } = paymentIntent.metadata;
      if (tickets) {
        const parsedTickets: ITicketPurchase[] = JSON.parse(tickets);
        const hasValidTickets = parsedTickets.some(ticket => ticket.quantity > 0);
        if (hasValidTickets) {
          await this._eventWebHookUseCase.execute(eventId, userId, parsedTickets, paymentIntent.id);
        }
      }
    }

    if (bookingType === "service") {
      const { serviceId, clientId, currency, vendorId } = paymentIntent.metadata;
      const bookingDataStr = paymentIntent.metadata.bookingData;
      if (bookingDataStr) {
        const parsedBookingData = JSON.parse(bookingDataStr);
     
        const totalAmount = paymentIntent.amount / 100;
        await this._HandleServiceBookingWebhookUseCase.execute(vendorId, serviceId, clientId, currency, parsedBookingData, totalAmount, paymentIntent.id);
      }
    }
  }

  res.json({ received: true });
}
}