import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { IQrCodeService } from "@entities/serviceInterfaces/qr-code-service.interface";
import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";
import { IHandleEventWebHookUseCase, ITicketPurchase } from "@entities/useCaseInterfaces/client/event/event-webhook-handle.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
import { createTransaction } from "@mappers/WalletMapper";
// import { createTransaction } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, FCM_NOTIFICATION_MESSAGE, HTTP_STATUS } from "@shared/constants";
import { TicketDTO } from "@shared/dtos/ticket.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class EventWebHookHandleUseCase implements IHandleEventWebHookUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository,
        @inject("IClientRepository") private _clientRepo : IClientRepository,
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository,
        @inject("IWalletRepository") private _walletRepo : IWalletRepository,
        @inject("IQRCodeService") private _qrCodeService : IQrCodeService,
        @inject("IRedisLockService") private _lockService : ILockService,
        @inject("INotificationService") private _notificationService : INotificationService
    ){}


    async execute(eventId: string, userId: string, tickets: ITicketPurchase[], paymentId: string,vendorId:string): Promise<void> {
        
        const eventExist = await this._eventRepo.findById(eventId)

        const userExist = await this._clientRepo.findById(userId);

        if(!eventExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }


        if(!eventExist.isActive){
            throw new CustomError(ERROR_MESSAGES.EVENT_BOOKING_BLOCKED_ERROR,HTTP_STATUS.BAD_REQUEST)
        }

        if(!userExist){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const ticketsToCreate: TicketDTO[] = [];

        for(const ticket of tickets){

            if(ticket.quantity<=0) continue

            const ticketOption = eventExist?.tickets?.find((t)=>t.ticketType===ticket.ticketType)

            if(!ticketOption){
                throw new CustomError(ERROR_MESSAGES.TICKET_TYPE_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
            }

            if(ticketOption.totalTickets - (ticketOption.bookedTickets || 0) < ticket.quantity){
                throw new CustomError(ERROR_MESSAGES.NOT_ENOUGH_TICKET_AVAILABLE,HTTP_STATUS.BAD_REQUEST)
            }


            for(let i=0;i<ticket.quantity;i++){

                const ticketId = generateRandomUUID()

                const qrCode = await this._qrCodeService.generateQrCode(`${eventId}|${ticket.ticketType}|${ticketId}`)

                ticketsToCreate.push({
                    clientId:userId,
                    name:userExist.name,
                    email:userExist.email,
                    eventId:eventId,
                    qrCodeLink:qrCode,
                    amount:ticket.pricePerTicket,
                    ticketType:ticket.ticketType,
                    paymentTransactionId:paymentId,
                    quantity:1,
                    ticketId:ticketId,
                    ticketStatus:"unused",
                    paymentStatus:"successfull",
                    title:eventExist.title
                })

                const commisionForAdmin = ticket.pricePerTicket * 0.25
                const commissionForVendor = ticket.pricePerTicket * 0.75
                const adminTransaction = createTransaction("ticketBooking","Event",ticketId,commisionForAdmin,"credit");
                const vendorTransaction = createTransaction("ticketBooking","Event",ticketId,commissionForVendor,"credit");

                await this._walletRepo.findWalletByUserTypeAndUpdate("admin",adminTransaction,commisionForAdmin);
                await this._walletRepo.findWalletByUserIdAndUpdate(vendorId,vendorTransaction,commissionForVendor)
            }
        }


        
        await this._ticketRepo.createTicket(ticketsToCreate)
        
        for(const ticket of tickets){
            await this._eventRepo.updateAfterTicketBooking(eventId,ticket.quantity,ticket.ticketType)
        }
        
        if(userExist.fcmToken){
            await this._notificationService.sendNotification(
                userId,
                userExist.fcmToken,
                {
                    title:FCM_NOTIFICATION_MESSAGE.EVENT_BOOKING_SUCCESS.title,
                    body:FCM_NOTIFICATION_MESSAGE.EVENT_BOOKING_SUCCESS.body
                }
            );
        }


        const ticketType = tickets.map(t => t.ticketType).join(",");
        await this._lockService.releaseEventLock(eventId,ticketType,userId)
    }
}