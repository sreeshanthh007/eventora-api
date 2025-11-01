
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { ISlotGeneratorService } from "@entities/serviceInterfaces/slot-generator.service.interface";
import { IGetAllServiceDetailsUseCase } from "@entities/useCaseInterfaces/client/service/get-service-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapServiceForServiceDetails } from "@mappers/serviceMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { GetServiceDetailsForClientsDTO } from "@shared/dtos/service.dto";

import { inject, injectable } from "tsyringe";



@injectable()
export class GetServiceDetailsUseCase implements IGetAllServiceDetailsUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository,
        @inject("ISlotGeneratorService") private _slotGeneratorService : ISlotGeneratorService
    ){}


    async execute(serviceId: string): Promise<GetServiceDetailsForClientsDTO | null> {
        
        const serviceExist = await this._serviceRepo.getServiceDetails(serviceId)
        if(!serviceExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }


        const slots = await this._slotGeneratorService.generateSlots({
            serviceId:serviceExist._id?.toString() || "",
            frequency:serviceExist.schedule.frequency,
            startDate:serviceExist.schedule.startDate,
            endDate: new Date(serviceExist.schedule.endDate),
            startTime: serviceExist.schedule.startTime,
            endTime: serviceExist.schedule.endTime,
            duration: serviceExist.schedule.duration,
            workingDays: serviceExist.schedule.workingDays || [],
            holidays: serviceExist.holidays || undefined
        });


   
        const mappedService = mapServiceForServiceDetails(serviceExist,slots)

        return mappedService
    }

}