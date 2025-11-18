import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IStripeService } from "@entities/serviceInterfaces/stripe-service-interface";
import { IRetryEventPaymentUseCase } from "@entities/useCaseInterfaces/client/event/retry-event-payment.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";



@injectable()
export class RetryEventPaymentUseCase implements IRetryEventPaymentUseCase{

    constructor(
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository,
        @inject("IEventRepository") private _eventRepo : IEventRepository,
        @inject("IStripeService") private _stripeService : IStripeService
    ){}


    async execute(ticketId: string): Promise<Stripe.PaymentIntent> {
        
        const ticket = await this._ticketRepo.findTicketById(ticketId)

        if(!ticket){
            throw new CustomError(ERROR_MESSAGES.TICKET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(ticket.paymentStatus=="successfull"){
            throw new CustomError(ERROR_MESSAGES.PAYMENT_ALREADY_COMPLETED,HTTP_STATUS.BAD_REQUEST)
        }

        if(ticket.paymentStatus!=="failed"){
            throw new CustomError(ERROR_MESSAGES.FAILED_PAYMENT_RETRY,HTTP_STATUS.BAD_REQUEST)
        }

           const event = await this._eventRepo.findById(ticket.eventId.toString());
            if (!event) {
              throw new CustomError(ERROR_MESSAGES.EVENT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
             }

            const vendorId = event.hostId;
            if (!vendorId) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
            }

           const tickets = [
            {
                ticketType: ticket.ticketType,
                pricePerTicket: ticket.amount,
                quantity: 1,
            },
        ];

        const paymentIntent = await this._stripeService.createPaymentIntent("event",ticket.amount,"INR",ticket.eventId.toString(),ticket.clientId.toString(),tickets,event.hostId.toString());

        return paymentIntent

    }
}