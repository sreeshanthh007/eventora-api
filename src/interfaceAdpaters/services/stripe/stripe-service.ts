import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IStripeService } from "@entities/serviceInterfaces/stripe-service-interface";
import { CustomError } from "@entities/utils/custom.error";
import stripe from "@frameworks/stripe/stripe-client";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";



@injectable()
export class StripeService  implements IStripeService {
  private static _stripe = stripe;


  constructor(

    @inject("IEventRepository") private _eventRepo : IEventRepository
  ){}

    async createPaymentIntent(
      bookingType:string,
        amount: number,
      currency: string,
      eventId: string, 
      userId: string,
      tickets: { ticketType: string; pricePerTicket: number; quantity: number }[], vendorId:string
    ): Promise<Stripe.PaymentIntent> {
      try {
        const totalAmount = tickets.reduce((sum, t) => sum + t.pricePerTicket * t.quantity, 0);

        const paymentIntent = await StripeService._stripe.paymentIntents.create({
          amount:totalAmount*100,
          currency,
          metadata: {
            bookingType,
            eventId,
            userId,
            tickets: JSON.stringify(tickets),
            amount,
            vendorId
          },
        });

        

        const eventExist = await this._eventRepo.findById(eventId)

        if(!eventExist){
          throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }


        for(const ticket of tickets){

          if(ticket.quantity<=0) continue

          const ticketOptions = eventExist.tickets?.find((t)=>t.ticketType==ticket.ticketType)

          if(!ticketOptions){
            throw new CustomError(ERROR_MESSAGES.TICKET_TYPE_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
          }

          if(ticketOptions.totalTickets-(ticketOptions.bookedTickets || 0) < ticket.quantity){
            throw new CustomError(ERROR_MESSAGES.NOT_ENOUGH_TICKET_AVAILABLE,HTTP_STATUS.BAD_REQUEST)
          } 
        }

        return paymentIntent;
    } catch (error: unknown) {
     if (error instanceof Error) {
      console.error("Error creating PaymentIntent:", error.message);
    throw new CustomError(error.message, HTTP_STATUS.BAD_REQUEST);
    }

      console.error("Unknown error creating PaymentIntent:", error);
      throw new CustomError("Unexpected error occurred", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
    }
  }
