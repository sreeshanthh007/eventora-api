


export interface IRRuleServiceEntity{
     _id?: string
        vendorId?:string,
        serviceTitle:string,
        yearsOfExperience:number,
        serviceDescription:string,
        servicePrice:number,
        serviceDuration:number,
        additionalHourPrice:number,
        cancellationPolicies:string[],
        termsAndConditions:string[],
        categoryId:string,
        status?:string
        categoryName?:string
        frequency:string
        schedule:{
            frequency:string
            startDate:Date,
            endDate:Date,
            startTime:string
            endTIme:string
            duration:number
            capacity:number
            workingDays:number[]
            rrule:string
        },
    holidays:Date[]
}