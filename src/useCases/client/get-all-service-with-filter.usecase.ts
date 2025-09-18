import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetAllServiceWithFilterUseCase, ServiceFilters } from "@entities/useCaseInterfaces/client/get-all-service-with-filter.usecase.interface";
import { mapServiceforClientPage } from "@mappers/serviceMapper";
import { PaginatedServicesForClient } from "interfaceAdpaters/models/paginatedService";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllServicesWithFilterUseCase implements IGetAllServiceWithFilterUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}


    async execute(serviceFilters: ServiceFilters): Promise<PaginatedServicesForClient> {
        
        const {page,limit,search,sort} =serviceFilters


        const validPageNumber = Math.max(1,page || 1)

        const skip = (validPageNumber - 1)*limit

        const {services,total} = await this._serviceRepo.findFIlteredSevices(
            {search,sort},
            skip,
            limit
        );

      
        const mappedServices = services.map(mapServiceforClientPage)

        return {
            services:mappedServices,
            total:Math.ceil(total/limit)
        }


    }
}