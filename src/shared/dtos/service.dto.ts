

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
}