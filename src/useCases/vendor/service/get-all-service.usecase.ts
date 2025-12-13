
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetAllServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/get-all-service-vendor.interface.usecase";
import { mapServiceToTableResponse } from "@mappers/serviceMapper";
import { PAGINATION } from "@shared/constants";
import { PaginatedServices } from "interfaceAdapters/models/paginatedService";

import { inject, injectable } from "tsyringe";



@injectable()
export class GetAllServiceUseCase implements IGetAllServiceUseCase{
    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}

   async execute(limit: number, searchTerm: string, current: number, vendorId: string): Promise<PaginatedServices> {
       
       
        const safePage = Math.max(
          PAGINATION.PAGE,
          current || PAGINATION.PAGE
        )
        
        const safeLimit = Math.min(
          PAGINATION.MAX_LIMIT,
          Math.max(1, limit || PAGINATION.LIMIT)
        );
        
       

        const skip = (safePage - 1)*safeLimit

        const {services,total} = await this._serviceRepo.getAllServices(searchTerm,skip,limit,vendorId)
    
        const mappedServices = services.map(mapServiceToTableResponse)

        const response : PaginatedServices ={
            services:mappedServices,
            total:Math.ceil(total/limit)
        }

        return response
   }
}