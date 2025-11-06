import { IStripeService } from "@entities/serviceInterfaces/stripe-service-interface";
import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";
import { ICreateBookingUseCase } from "@entities/useCaseInterfaces/client/creating-booking-usercase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { TicketItemDTO } from "@shared/dtos/event-booking.dto";
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateBookingUseCase implements ICreateBookingUseCase{

    constructor(
        @inject("IStripeService") private _stripeService : IStripeService,
        @inject("IRedisLockService") private _lockService : ILockService,
    ){}

    async execute(bookingType:string,amount: number, currency: string, eventId: string, userId: string, tickets: TicketItemDTO[],vendorId:string): Promise<Stripe.PaymentIntent> {
        
        for(const ticket of tickets){
        const locked = await this._lockService.acquireEventLock(eventId, ticket.ticketType, userId, 60);
        
        if(!locked){
            throw new CustomError(ERROR_MESSAGES.TICKET_LOCKED_ERROR,HTTP_STATUS.CONFLICT)
        }


    }

    const paymentIntent = await this._stripeService.createPaymentIntent(bookingType,amount,currency,eventId,userId,tickets,vendorId);

    return paymentIntent
    }
}