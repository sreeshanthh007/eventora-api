
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetAllServiceDetailsUseCase } from "@entities/useCaseInterfaces/client/get-service-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { ServiceDTO } from "@shared/dtos/service.dto";

import { inject, injectable } from "tsyringe";


@injectable()
export class GetServiceDetailsUseCase implements IGetAllServiceDetailsUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}


    async execute(serviceId: string): Promise<ServiceDTO | null> {
        
        const serviceExist = await this._serviceRepo.findById(serviceId)

        if(!serviceExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }


        const mappedService  : ServiceDTO = {
            _id:serviceExist._id?.toString(),
            additionalHourPrice:serviceExist.additionalHourPrice,
            cancellationPolicies:serviceExist.cancellationPolicies,
            serviceDescription:serviceExist.serviceDescription,
            serviceDuration:serviceExist.serviceDuration,
            servicePrice:serviceExist.servicePrice,
            serviceTitle:serviceExist.serviceTitle,
            termsAndConditions:serviceExist.termsAndConditions,
            yearsOfExperience:serviceExist.yearsOfExperience
        }

        return mappedService
    }

}