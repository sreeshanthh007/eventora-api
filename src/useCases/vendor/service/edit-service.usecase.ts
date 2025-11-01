
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { EditableServiceFields, IEditServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class EditServiceUseCase implements IEditServiceUseCase{
    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository,
    ){}


    async execute(serviceId: string, data: EditableServiceFields): Promise<void> {
         const service = await this._serviceRepo.findById(serviceId)
       

        if(!service){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this._serviceRepo.findByIdAndUpdate(serviceId,data)
    }
}