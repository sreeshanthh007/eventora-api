import { AdminAnalyticsResponseDTO } from "@shared/dtos/admin-analytics.dto";

export interface IGetAdminAnalyticsDashboardUseCase{
    execute(period:string,startDate?:Date,endDate?:Date)  : Promise<AdminAnalyticsResponseDTO>
}