

export interface ServiceTableDTO{
    _id?:string
    serviceTitle:string
    serviceDescription:string
    servicePrice:number
    status?:string
    serviceDuration:number
}


export interface PaginatedServiceDTO{
    _id?:string
    serviceTitle:string
    serviceDescription:string
    servicePrice:number
    yearsOfExperience:number
     categoryName: string 
     vendorId:string
}

export interface PaginatedServicesProvidedByVendorsDTO{
  _id?:string
  serviceTitle:string
  serviceDescription:string
  yearsOfExperience:number
  categoryName:string
}


export interface ServiceDTO{
    _id?:string
    serviceTitle:string
    serviceDescription:string
    servicePrice:number
    yearsOfExperience:number
    serviceDuration:number
    cancellationPolicies:string[]
    termsAndConditions:string[]
    additionalHourPrice:number
    slots?: {
    startDateTime?: Date;
    endDateTime?: Date;
    capacity?: number;
    bookedCount?: number;
  }[];
}
export interface RRuleServiceDTO{
    _id?:string
    serviceTitle:string
    serviceDescription:string
    servicePrice:number
    yearsOfExperience:number
    serviceDuration:number
    cancellationPolicies:string[]
    termsAndConditions:string[]
    additionalHourPrice:number
    schedule?: {
    frequency?: string;
    startDate?: Date;
    endDate?: Date;
    startTime?:string
    endTime?:string
    duration?:string
    workingDays?:number[]
    capacity?: number;
  }[];
}


export interface GetServiceDetailsForClientsDTO{
    _id?:string
    serviceTitle:string
    serviceDescription:string
    servicePrice:number
    yearsOfExperience:number
    serviceDuration:number
    cancellationPolicies:string[]
    termsAndConditions:string[]
    additionalHourPrice:number
    vendor: {
    vendorId:string
    name: string;
    email: string;
    profilePicture?: string;
    place:string
  };
}



export interface CreateServiceDTO {
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  yearsOfExperience: number;
  serviceDuration: number;
  cancellationPolicies: string[];
  termsAndConditions: string[];
  additionalHourPrice: number;
  categoryId: string;
  schedule: {
    frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ONCE";
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    duration: number;
    capacity: number;
    bookedCount?:number
    workingDays?: number[];
  };
  holidays?: Date[];
}


export interface EditServiceDTO {
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  yearsOfExperience: number;
  serviceDuration: number;
  cancellationPolicies: string[];
  termsAndConditions: string[];
  additionalHourPrice: number;
  categoryId: string;
  schedule?: {
    frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    workingDays?: number[];
    duration: number;
    capacity: number;
  };
  holidays?: Date[];
}


