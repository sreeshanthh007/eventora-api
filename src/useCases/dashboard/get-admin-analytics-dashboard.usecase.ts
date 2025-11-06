import { IAdminRepository } from "@entities/repositoryInterfaces/admin/admin-repository-interface";
import { IGetAdminAnalyticsDashboardUseCase } from "@entities/useCaseInterfaces/dashboard/get-admin-analytics-dashboard.usecase.interface";
import { AdminAnalyticsResponseDTO } from "@shared/dtos/admin-analytics.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAdminAnalyticsDashboardUseCase implements IGetAdminAnalyticsDashboardUseCase{

    constructor(
        @inject("IAdminRepository") private _adminRepo : IAdminRepository
    ){}


    async execute(period: string, startDate?: Date, endDate?: Date): Promise<AdminAnalyticsResponseDTO> {
        
        const data = await this._adminRepo.getAnalyticsDashboard(period,startDate,endDate);

        return data
    }
}