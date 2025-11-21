import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetServicesProvidedByVendorsUseCase } from "@entities/useCaseInterfaces/client/service/get-services-provided-vendors.usecase.interface";
import { mapServiceForServiceDetailsSuggestion } from "@mappers/serviceMapper";
import { PaginatedServicesProvidedByVendorsDTO } from "@shared/dtos/service.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetServicesProvidedByVendorsUseCase implements IGetServicesProvidedByVendorsUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}


  async execute(vendorId: string): Promise<PaginatedServicesProvidedByVendorsDTO[] | null> {
      
    const services = await this._serviceRepo.findServicesProvidedByVendors(vendorId)

    if(services){
        const mappedServices = services.map(service => mapServiceForServiceDetailsSuggestion(service));
      
        return mappedServices
    }
    return null
  }
}