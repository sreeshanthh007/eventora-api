import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetVendorAnalyticsDashboardUseCase } from "@entities/useCaseInterfaces/dashboard/get-vendor-analytics-dashboard.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { VendorAnalyticsDashboardResponseDTO } from "@shared/dtos/vendor-analytics.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetVendorAnalyticsDashboardUseCase implements IGetVendorAnalyticsDashboardUseCase{

    constructor(
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}


    async execute(vendorId: string, period: string, startDate?: Date, endDate?: Date): Promise<VendorAnalyticsDashboardResponseDTO> {
        
        const vendor = await this._vendorRepo.findById(vendorId)

        if(!vendor){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const analyticsData = await this._vendorRepo.getVendorAnalyticsDashboard(vendorId,period,startDate,endDate)

        return analyticsData
    }
}