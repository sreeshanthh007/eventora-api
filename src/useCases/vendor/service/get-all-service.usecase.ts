import { IServiceEntity } from "@entities/models/service.entity";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetAllServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/get-all-service-vendor.interface.usecase";
import { mapServiceToTableResponse } from "interfaceAdpaters/mappers/serviceMapper";
import { PaginatedServices } from "interfaceAdpaters/models/paginatedService";
import { FilterQuery } from "mongoose";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetAllServiceUseCase implements IGetAllServiceUseCase{
    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}

    async execute(limit: number, searchTerm: string, current: number): Promise<PaginatedServices> {
        
        const filter : FilterQuery<IServiceEntity> = {}

        if(searchTerm){
            filter.$or=[
                {serviceTitle:{$regex:searchTerm,$options:"i"}}
            ]
        }

        const validPageNumber = Math.max(1,current || 1)

        const skip = (validPageNumber - 1)*limit

        const {services,total} = await this._serviceRepo.getAllServices(filter,skip,limit)

        const mappedServices = services.map(mapServiceToTableResponse)

        const response : PaginatedServices ={
            services:mappedServices,
            total:Math.ceil(total/limit)
        }

        return response

    }
}