import { ServiceTableDTO } from "@shared/dtos/service.dto";


export interface PaginatedServices{
    services:ServiceTableDTO[];
    total:number
}