import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IHandleToggleServiceByVendorsUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle-service-vendors.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class HandleToggleServiceByVendorsUseCase implements IHandleToggleServiceByVendorsUseCase{
  
  constructor(
    @inject("IServiceRepository") private _serviceRepo : IServiceRepository
  ){}
  
  
  async execute(serviceId: string): Promise<void> {
      
    const serviceExist = await this._serviceRepo.findById(serviceId)
    
    if(!serviceExist){
      throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }
    
    const newStatus = serviceExist.status=="active" ? "blocked" : "active"
    
    await this._serviceRepo.findByIdAndUpdateStatus(serviceId,newStatus)
  }
}