

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
    slots?: {
    startDateTime?: Date;
    endDateTime?: Date;
    capacity?: number;
    bookedCount?: number;
  }[];
    vendor: {
      vendorId:string
    name: string;
    email: string;
    profilePicture?: string;
    place:string
    description:string
  };
}



export interface CreateServiceDTO{
    serviceTitle:string
    serviceDescription:string
    servicePrice:number
    yearsOfExperience:number
    serviceDuration:number
    cancellationPolicies:string[]
    termsAndConditions:string[]
    additionalHourPrice:number
    categoryId:string
    slots?: {
    startDateTime?: Date;
    endDateTime?: Date;
    capacity?: number;
  }[];
}

export interface EditServiceDTO{
    serviceTitle:string
    serviceDescription:string
    servicePrice:number
    yearsOfExperience:number
    serviceDuration:number
    cancellationPolicies:string[]
    termsAndConditions:string[]
    additionalHourPrice:number
    categoryId:string
    slots?: {
    startDateTime?: Date;
    endDateTime?: Date;
    capacity?: number;
  }[];
}



