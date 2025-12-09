import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { ILockService } from "@entities/serviceInterfaces/lock-service.interface";
import { ITicketPurchaseDTO } from "@shared/dtos/ticket.dto";

import { IHandleEventPaymentFailedUseCase } from "@entities/useCaseInterfaces/client/event/handle-event-payment-failed.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, FCM_NOTIFICATION_MESSAGE, HTTP_STATUS } from "@shared/constants";
import { TicketDTO } from "@shared/dtos/ticket.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class HandleEventPaymentFaileUseCase implements IHandleEventPaymentFailedUseCase{

    constructor(
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository, 
        @inject("IEventRepository") private _eventRepo : IEventRepository,  
        @inject("IClientRepository") private _clientRepo : IClientRepository ,
         @inject("INotificationService") private _notificationService : INotificationService,
         @inject("IRedisLockService") private _lockService : ILockService,
         @inject("IUUIDGeneratorService") private _generateUUID: IUUIDGeneratorService
    ){}

    async execute(eventId: string, userId: string, tickets: ITicketPurchaseDTO[], paymentId: string): Promise<void> {

        const client = await this._clientRepo.findById(userId)

        const event = await this._eventRepo.findById(eventId)


        if(!client){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(!event){
            throw new CustomError(ERROR_MESSAGES.EVENT_NOT_FOUND,HTTP_STATUS.NOT_FOUND)

        }

        const ticketsToCreate : TicketDTO[] = []


        for(const ticket of tickets){
            if(ticket.quantity<=0) continue

            const ticketOption = event?.tickets?.find((t)=>t.ticketType===ticket.ticketType);

            if(!ticketOption){
                throw new CustomError(ERROR_MESSAGES.TICKET_TYPE_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
            }

            if(ticketOption.totalTickets - (ticketOption.bookedTickets || 0) < ticket.quantity){
                throw new CustomError(ERROR_MESSAGES.NOT_ENOUGH_TICKET_AVAILABLE,HTTP_STATUS.BAD_REQUEST)
            }

            for(let i=0;i<ticket.quantity;i++){

                const ticketId = this._generateUUID.generate()

                 ticketsToCreate.push({
                    clientId:userId,
                    name:client.name,
                    email:client.email,
                    eventId:eventId,
                    qrCodeLink:"",
                    amount:ticket.pricePerTicket,
                    ticketType:ticket.ticketType,
                    paymentTransactionId:paymentId,
                    quantity:1,
                    ticketId:ticketId,
                    ticketStatus:"unused",
                    paymentStatus:"failed",
                    title:event.title
                });
            }

        }

        await this._ticketRepo.createTicket(ticketsToCreate)

        if(client.fcmToken){
            await this._notificationService.sendNotification(
                userId,
                client.fcmToken,
                {
                    title:FCM_NOTIFICATION_MESSAGE.EVENT_BOOKING_FAILED.title,
                    body:FCM_NOTIFICATION_MESSAGE.EVENT_BOOKING_FAILED.body
                }
            )
        }

        const ticketType = tickets.map(t => t.ticketType).join(",");

        await this._lockService.releaseEventLock(eventId,ticketType,userId)

    }
}