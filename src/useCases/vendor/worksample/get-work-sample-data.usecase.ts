import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { IGetworkSampleDataUseCase } from "@entities/useCaseInterfaces/vendor/worksample/get-work-sample-data.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { mapToWorkSampleDTO } from "@mappers/WorkSampleMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IWorkSampleResponseToVendorDTO } from "@shared/dtos/work-sample.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetWorkSampleDataUseCase implements IGetworkSampleDataUseCase{

    constructor(
        @inject("IWorkSampleRepository") private _workSampleRepo : IWorkSampleRepository
    ){}


    async execute(vendorId: string): Promise<IWorkSampleResponseToVendorDTO> {
        
        const data = await this._workSampleRepo.getWorkSampleData(vendorId)

 
        if(!data){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }
        const mappdData = mapToWorkSampleDTO(data)

        return mappdData

    }
}