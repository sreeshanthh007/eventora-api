

import { TServiceEntityWithPopulatedVendorForAdmin, TServiceEntityWithPopulatedVendorForClient } from "@entities/models/populated-types/service-populated.type";
import { IServiceEntity } from "@entities/models/service.entity";
import { SlotGenerationResponse } from "@shared/dtos/slot-generator.dto";
import { PaginatedServiceDTO, PaginatedServicesProvidedByVendorsDTO, ServiceTableDTO, ServiceTableDTOForAdmin } from "@shared/dtos/service.dto";


export interface IServiceResponse {
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  serviceDuration: number;
  yearsOfExperience: number;
  additionalHourPrice: number;
  termsAndConditions: string[];
  cancellationPolicies: string[];
  categoryId: string;
  schedule?: {
    frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    workingDays?: number[]; 
    capacity:number
    duration:number
  };
  holidays?: Date[];      
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
export function mapServiceToTableResponseForAdmin(service: TServiceEntityWithPopulatedVendorForAdmin) : ServiceTableDTOForAdmin {
  return {
    _id: service._id?.toString(),
    serviceTitle: service.serviceTitle,
    servicePrice: service.servicePrice,
    status:service.status,
    serviceDescription:service.serviceDescription,

    vendorId:{
      name:service.vendorId.name!,
      email:service.vendorId.email!,
      profilePicture:service.vendorId.profilePicture!
    }

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
    categoryId:service.categoryId,
       schedule:{
        frequency:service.schedule.frequency,
        startDate:service.schedule.startDate,
        endDate:service.schedule.endDate,
        startTime:service.schedule.startTime,
        endTime:service.schedule.endTime,
        capacity:service.schedule.capacity,
        duration:service.schedule.duration,
        workingDays:service.schedule.workingDays
       },
      holidays:service.holidays
}
}


export function mapServiceforClientPage(service:IServiceEntity) : PaginatedServiceDTO{

  return {
    _id:service._id?.toString(),
    serviceTitle:service.serviceTitle,
    serviceDescription:service.serviceDescription,
    yearsOfExperience:service.yearsOfExperience,
    categoryName:service.categoryName!,
    servicePrice:service.servicePrice,
    vendorId:service.vendorId?.toString() || ""
  }
}



export function mapServiceForServiceDetailsSuggestion(service:IServiceEntity) : PaginatedServicesProvidedByVendorsDTO{
  return{
    _id:service._id?.toString(),
    serviceTitle:service.serviceTitle,
    serviceDescription:service.serviceDescription,
    yearsOfExperience:service.yearsOfExperience,
    categoryName:service.categoryName!
  }
}


export function mapServiceForServiceDetails(
  service: TServiceEntityWithPopulatedVendorForClient,
  slots:SlotGenerationResponse[]
) {
  return {
    _id: service._id!.toString(),
    serviceTitle: service.serviceTitle,
    serviceDescription: service.serviceDescription,
    servicePrice: service.servicePrice,
    serviceDuration: service.serviceDuration,
    additionalHourPrice: service.additionalHourPrice,
    yearsOfExperience: service.yearsOfExperience,
    termsAndConditions: service.termsAndConditions,
    cancellationPolicies: service.cancellationPolicies,
    schedule:{
      startDate:service.schedule.startDate,
      endDate:service.schedule.endDate,
      workingDays:service.schedule.workingDays,
      holidays:service.holidays
    },
    slots,
    vendor: {
    vendorId: service.vendorId._id.toString(), 
    name: service.vendorId.name || "",
    email: service.vendorId.email || "",
    place: service.vendorId.place || "",
    profilePicture: service.vendorId.profilePicture || "",
  }
  };
}
