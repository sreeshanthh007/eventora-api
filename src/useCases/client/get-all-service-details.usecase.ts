
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllServiceDetailsUseCase } from "@entities/useCaseInterfaces/client/get-service-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { GetServiceDetailsForClientsDTO } from "@shared/dtos/service.dto";

import { inject, injectable } from "tsyringe";


@injectable()
export class GetServiceDetailsUseCase implements IGetAllServiceDetailsUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository,
    ){}


    async execute(serviceId: string): Promise<GetServiceDetailsForClientsDTO | null> {
        
        const serviceExist = await this._serviceRepo.findById(serviceId)
        if(!serviceExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }

     
            const vendor = await this._vendorRepo.findById(serviceExist.vendorId!)

            if(!vendor){
                throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }

        
            const mappedService  : GetServiceDetailsForClientsDTO = {
            _id:serviceExist._id?.toString(),
            additionalHourPrice:serviceExist.additionalHourPrice,
            cancellationPolicies:serviceExist.cancellationPolicies,
            serviceDescription:serviceExist.serviceDescription,
            serviceDuration:serviceExist.serviceDuration,
            servicePrice:serviceExist.servicePrice,
            serviceTitle:serviceExist.serviceTitle,
            termsAndConditions:serviceExist.termsAndConditions,
            yearsOfExperience:serviceExist.yearsOfExperience,
              slots: serviceExist.slots?.map(slot => ({
            startDateTime: slot.startDateTime,
             endDateTime: slot.endDateTime,
            capacity: slot.capacity,
             })) || [],
             vendor:{
                vendorId:vendor._id.toString(),
                name:vendor.name,
                email:vendor.email,
                place:vendor.place,
                description:vendor.about,
                profilePicture:vendor.profilePicture
             }

        }
        return mappedService
    }

}