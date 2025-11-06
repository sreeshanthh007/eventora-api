import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IServicebookingStripeService } from "@entities/serviceInterfaces/service-booking-stripe.service";
import { CustomError } from "@entities/utils/custom.error";
import stripe from "@frameworks/stripe/stripe-client";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";

@injectable()
export class ServiceBookingStripeService implements IServicebookingStripeService{

    private static _stripe = stripe;

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}


    async createPaymentIntent(bookingType:string, amount: number, currency: string, vendorId: string, serviceId: string,clientId:string, bookingData: { selectedDate: string; selectedSlotTime: string; name: string; email: string; phone: string; }): Promise<Stripe.PaymentIntent> {
        
             
        try {
            const totalAmount = amount;

            const paymentIntent = await ServiceBookingStripeService._stripe.paymentIntents.create({

                amount: totalAmount * 100,
                currency,
                metadata:{
                    currency,
                    clientId,
                    serviceId,
                    bookingType,
                    vendorId,
                   bookingData: JSON.stringify({
                    selectedDate: bookingData.selectedDate,
                    selectedSlotTime: bookingData.selectedSlotTime,
                    name: bookingData.name,
                    email: bookingData.email,
                    phone: bookingData.phone
            })
                },
                receipt_email: bookingData.email,
                description: `Payment for service booking: ${serviceId}`
            });

            const serviceExist = await this._serviceRepo.findById(serviceId)
            const vendorExist = await this._vendorRepo.findById(vendorId)

            if(!serviceExist){
                throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }

            if(!vendorExist){
                throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }


            const bookingDate = new Date(bookingData.selectedDate)

            const today = new Date()

            today.setHours(0,0,0,0)

            if(bookingDate < today){
                throw new CustomError(ERROR_MESSAGES.SERVICE_BOOKING_ERROR,HTTP_STATUS.BAD_REQUEST)
            }


            if(bookingDate.getTime() == today.getTime()){
                const [startTime] = bookingData.selectedSlotTime.split(" - ")
                const [hour,minute] = startTime.split(":").map(Number)

                const slotDateTime = new Date()

                slotDateTime.setHours(hour,minute,0,0)

                if(slotDateTime<= new Date()){
                    throw new CustomError(ERROR_MESSAGES.SERVICE_SLOT_BOOKING_ERROR,HTTP_STATUS.BAD_REQUEST)
                }

            }
            
            return paymentIntent;
        } catch (error) {
            if(error instanceof  Error){
                console.error("Error creating PaymentIntent:", error.message);
                 throw new CustomError(error.message, HTTP_STATUS.BAD_REQUEST);
            }
            console.error("Unknown error creating PaymentIntent:", error);
         throw new CustomError("Unexpected error occurred", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}