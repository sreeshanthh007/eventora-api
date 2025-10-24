import { PaginatedServicesProvidedByVendorsDTO } from "@shared/dtos/service.dto";

export interface IGetServicesProvidedByVendorsUseCase{
    execute(vendorId:string) : Promise<PaginatedServicesProvidedByVendorsDTO[] | null>
}