import { VendorAnalyticsDashboardResponseDTO } from "@shared/dtos/vendor-analytics.dto";


export interface IGetVendorAnalyticsDashboardUseCase{
    execute(vendorId:string,period:string,startDate?:Date,endDate?:Date) : Promise<VendorAnalyticsDashboardResponseDTO>
}