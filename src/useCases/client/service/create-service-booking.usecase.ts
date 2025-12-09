import { IServicebookingStripeService } from "@entities/serviceInterfaces/service-booking-stripe.service";
import { ILockService } from "@entities/serviceInterfaces/lock-service.interface";
import { ICreateServiceBookingUseCase } from "@entities/useCaseInterfaces/client/service/create-service-booking-usercase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateServiceBookingUseCase implements ICreateServiceBookingUseCase{

    constructor(
        @inject("IServiceBookingStripeService") private _serviceStripeService : IServicebookingStripeService,
        @inject("IRedisLockService") private _lockService : ILockService,
    ){}

 async execute(bookingType:string, clientId: string, vendorId: string, serviceId: string, bookingData: { selectedDate: string; selectedSlotTime: string; name: string; email: string; phone: string; }, amount: number, currency: string): Promise<Stripe.PaymentIntent> {
     
            const locked = await this._lockService.acquireServiceLock(serviceId,bookingData.selectedDate,bookingData.selectedSlotTime,clientId,60)


        if(!locked){
            throw new CustomError(ERROR_MESSAGES.SERVICE_SLOT_LOCKED_ERROR,HTTP_STATUS.CONFLICT)
        }

        const paymentIntent = await this._serviceStripeService.createPaymentIntent(bookingType,amount,currency,vendorId,serviceId,clientId,bookingData);


        return paymentIntent
 }


}