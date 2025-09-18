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
    amount: number,
    currency: string,
    eventId: string, 
    userId: string,
    ticketType: string,
    quantity:number
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await StripeService._stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          eventId,
          userId,
          ticketType,
          quantity,
          amount
        },
      });

      const eventExist = await this._eventRepo.findById(eventId)

      if(!eventExist){
        throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
      }


      if(ticketType){
        const ticketOption = eventExist.tickets?.find(t => t.ticketType === ticketType)

        if(!ticketOption){
          throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }

        if(ticketOption.totalTickets - (ticketOption.bookedTickets || 0) < quantity){
          throw new CustomError("Not Enough Ticket Available",HTTP_STATUS.BAD_REQUEST)
        }
      }else{
        if(eventExist.totalTicket - (eventExist.bookedTickets || 0) < quantity){
          throw new CustomError("Not Enough Ticket Available",HTTP_STATUS.BAD_REQUEST)
        }
      }

      return paymentIntent;
    } catch (error:any) {
      console.error("Error creating PaymentIntent:", error);
      throw new CustomError(error.message,HTTP_STATUS.BAD_REQUEST);
    }
  }
}
