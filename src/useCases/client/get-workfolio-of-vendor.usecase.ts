import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { IGetVendorWorkFolioUseCase } from "@entities/useCaseInterfaces/client/get-workfolio-of-vendor.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWorksampleForClient } from "@mappers/WorkSampleMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { WorkSampleResponseDTO } from "@shared/dtos/work-sample.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetWorkfolioOfVendorUseCase implements IGetVendorWorkFolioUseCase{

    constructor(
        @inject("IWorkSampleRepository") private _worksampleRepo : IWorkSampleRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}


    async execute(vendorId: string): Promise<WorkSampleResponseDTO> {
        
        const vendor = await this._vendorRepo.findById(vendorId)


        if(!vendor){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const worksample  = await this._worksampleRepo.getWorksampleForClients(vendorId)

        if(!worksample){
            throw new CustomError(ERROR_MESSAGES.WORK_SAMPLE_NOT_EXIST,HTTP_STATUS.NOT_FOUND)
        }
        const mappedWorksample = mapWorksampleForClient(worksample)

        return mappedWorksample
    }

}