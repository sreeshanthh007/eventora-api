import { IEventBookingController } from "@entities/controllerInterfaces/client/eventBooking/event-booking-controller.interface";
import { IStripeService } from "@entities/serviceInterfaces/stripe-service-interface";
import { IHandleEventWebHookUseCase } from "@entities/useCaseInterfaces/client/event-webhook-handle.usecase.interface";
import { RedisClient } from "@frameworks/cache/redis.client";
import stripe from "@frameworks/stripe/stripe-client";
import { CustomRequest } from "@middlewares/auth.middleware";
import { config } from "@shared/config";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { BookingCreationDTO } from "@shared/dtos/event-booking";
import { Request, Response } from "express";
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";



@injectable()
export class EventBookingController implements IEventBookingController{
     
    constructor(
        @inject("IStripeService") private _stripeService : IStripeService,
        @inject("IHandleEventWebhookUseCase") private _eventWebHookUseCase : IHandleEventWebHookUseCase
    ){}


   async createBooking(req: Request, res: Response): Promise<void> {
       
        const {eventId,ticketType,amount,currency,quantity} : BookingCreationDTO  = req.body
            console.log("amount in bookng",amount)
        const userId = (req as CustomRequest).user.id
        
        const lockKey = `lock:event:${eventId}:ticketType:${ticketType}`;
        
         const locked = await RedisClient.set(lockKey, userId, { NX: true, EX: 60 }) 
            if (!locked) {
            res.status(HTTP_STATUS.CONFLICT).json({
            success:false,
            message: ERROR_MESSAGES.TICKET_LOCKED_ERROR
        })
            return
        }
         const paymentIntent = await this._stripeService.createPaymentIntent(amount,currency,eventId,userId,ticketType,quantity);

         console.log("payentinterne",paymentIntent.amount);
         

         res.status(HTTP_STATUS.OK)
         .json({success:true,clientSecret:paymentIntent.client_secret});
        
   }

  async handleWebHook(req: Request, res: Response): Promise<void> {

        const sig = req.headers["stripe-signature"] as string

        let event: Stripe.Event;

        event = stripe.webhooks.constructEvent(req.body,sig,config.stripe.webHookSecrect!)
        
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            const { eventId, userId, ticketType, amount, quantity } = paymentIntent.metadata;
       
            await this._eventWebHookUseCase.execute(
                eventId,
                userId,
                ticketType,
                Number(amount),
                paymentIntent.id,
                Number(quantity)
            );

            // Release Redis lock
            const lockKey = `lock:event:${eventId}:ticketType:${ticketType}`;
            await RedisClient.del(lockKey);
        }

        res.json({ received: true });
    }
}