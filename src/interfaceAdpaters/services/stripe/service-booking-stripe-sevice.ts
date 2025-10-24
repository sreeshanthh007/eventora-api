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


    async createPaymentIntent(bookingType: string, amount: number, currency: string, vendorId: string, serviceId: string,clientId:string, bookingData: { slotStart: string; slotEnd: string; name: string; email: string; phone: string; }): Promise<Stripe.PaymentIntent> {
        
             
        try {
            const totalAmount = amount;

            const paymentIntent = await ServiceBookingStripeService._stripe.paymentIntents.create({

                amount: totalAmount * 100,
                currency,
                metadata:{
                    currency,
                    clientId,
                    bookingType,
                    serviceId,
                    vendorId,
                   bookingData: JSON.stringify({
                    slotStart: bookingData.slotStart,
                    slotEnd: bookingData.slotEnd,
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

         

            
            const slot = serviceExist.slots?.find((each)=>each.startDateTime?.toISOString()===bookingData.slotStart 
            && each.endDateTime?.toISOString()===bookingData.slotEnd
            );


            if(!slot){
                throw new CustomError(ERROR_MESSAGES.SLOT_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }

            if(slot.bookedCount! >=slot.capacity!){
                throw new CustomError(ERROR_MESSAGES.SLOT_CAPACITY_EXCEEDED,HTTP_STATUS.BAD_REQUEST)
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