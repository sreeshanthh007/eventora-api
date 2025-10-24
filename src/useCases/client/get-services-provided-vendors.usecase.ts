import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetServicesProvidedByVendorsUseCase } from "@entities/useCaseInterfaces/client/get-services-provided-vendors.usecase.interface";
import { mapServiceForServiceDetails } from "@mappers/serviceMapper";
import { PaginatedServicesProvidedByVendorsDTO } from "@shared/dtos/service.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetServicesProvidedByVendorsUseCase implements IGetServicesProvidedByVendorsUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}


  async execute(vendorId: string): Promise<PaginatedServicesProvidedByVendorsDTO[] | null> {
      
    const services = await this._serviceRepo.findServicesProvidedByVendors(vendorId)

    console.log("service by vendors",services)
    if(services){
        const mappedServices = services.map(service => mapServiceForServiceDetails(service));
        console.log("mapped serices are",mappedServices)
        return mappedServices
    }
    return null
  }
}