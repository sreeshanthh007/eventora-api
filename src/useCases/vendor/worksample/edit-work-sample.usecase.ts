import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { IEditWorkSampleUseCase } from "@entities/useCaseInterfaces/vendor/worksample/edit-work-sample.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { TeditWorkSampleDTO } from "@shared/dtos/work-sample.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class EditWorkSampleUseCase implements IEditWorkSampleUseCase{

    constructor(
        @inject("IWorkSampleRepository") private _workSampleRepo : IWorkSampleRepository
    ){}

    async execute(data: TeditWorkSampleDTO, worksampleId: string): Promise<void> {
        
        const workSampleExist = await this._workSampleRepo.findById(worksampleId);
        
        
        if(!workSampleExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }


        await this._workSampleRepo.updateWorkSample(worksampleId,data)

    }
}