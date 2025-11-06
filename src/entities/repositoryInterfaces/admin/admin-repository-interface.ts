import { IAdminEntity } from "@entities/models/admin.entity";
import { AdminAnalyticsResponseDTO } from "@shared/dtos/admin-analytics.dto";

export interface IAdminRepository {
  save(data: Partial<IAdminEntity>): Promise<IAdminEntity>;
  findByEmail(email: string): Promise<IAdminEntity | null>;
  getAnalyticsDashboard(period:string,startDate?:Date,endDate?:Date) : Promise<AdminAnalyticsResponseDTO>
}