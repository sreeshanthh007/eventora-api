import { PaginatedServiceDTO, PaginatedServicesProvidedByVendorsDTO, ServiceTableDTO, ServiceTableDTOForAdmin } from "@shared/dtos/service.dto";


export interface PaginatedServices{
    services:ServiceTableDTO[];
    total:number
}

export interface PaginatedServicesForClient {
    services:PaginatedServiceDTO[];
    total:number
}


export interface PaginatedServicesProvidedByVendors {
    services:PaginatedServicesProvidedByVendorsDTO[]
    total:number
}

export interface PaginatedServicesofVendorsForAdmin {
  services : ServiceTableDTOForAdmin[]
  total:number
}


