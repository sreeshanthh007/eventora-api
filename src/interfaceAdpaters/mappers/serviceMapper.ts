// import { IServiceEntity } from "@entities/models/service.entity";
// import { ServiceTableDTO } from "@shared/dtos/service.dto";

import { IServiceEntity } from "@entities/models/service.entity";
import { ServiceTableDTO } from "@shared/dtos/service.dto";


export interface IServiceResponse {
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  serviceDuration:number;
  yearsOfExperience:number;
  additionalHourPrice:number;
  termsAndConditions:string[];
  cancellationPolicies:string[];
  categoryId:string
}




export function mapServiceToTableResponse(service: IServiceEntity) : ServiceTableDTO {
  return {
    _id: service._id?.toString(),
    serviceTitle: service.serviceTitle,
    servicePrice: service.servicePrice,
    serviceDuration: service.serviceDuration,
    status:service.status,
    serviceDescription:service.serviceDescription,

  }
}

export function mapServiceForEditService(service:IServiceEntity) : IServiceResponse{
  return {
    serviceTitle:service.serviceTitle,
    additionalHourPrice:service.additionalHourPrice,
    cancellationPolicies:service.cancellationPolicies,
    serviceDescription:service.serviceDescription,
    serviceDuration:service.serviceDuration,
    servicePrice:service.servicePrice,
    termsAndConditions:service.termsAndConditions,
    yearsOfExperience:service.yearsOfExperience,
    categoryId:service.categoryId
  }
}