import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetAllServiceWithFilterUseCase, ServiceFilters } from "@entities/useCaseInterfaces/client/service/get-all-service-with-filter.usecase.interface";
import { mapServiceforClientPage } from "@mappers/serviceMapper";
import { PAGINATION } from "@shared/constants";
import { PaginatedServicesForClient } from "interfaceAdapters/models/paginatedService";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllServicesWithFilterUseCase implements IGetAllServiceWithFilterUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}


    async execute(serviceFilters: ServiceFilters): Promise<PaginatedServicesForClient> {
        
        const {page,limit,search,sort,categoryId} =serviceFilters


        const safePage = Math.max(
          PAGINATION.PAGE,
          page || PAGINATION.PAGE
        )
        
        const safeLimit = Math.min(
          PAGINATION.MAX_LIMIT,
          Math.max(1, limit || PAGINATION.LIMIT)
        );
        

        const skip = (safePage - 1)*safeLimit

        const {services,total} = await this._serviceRepo.findFIlteredSevices(
            {search,sort,categoryId},
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