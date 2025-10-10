import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { IAddWorkSampleUseCase} from "@entities/useCaseInterfaces/vendor/worksample/add-work-sample.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IWorksampleDTO } from "@shared/dtos/work-sample.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class AddWorksampleUseCase implements IAddWorkSampleUseCase{

    constructor(
        @inject("IVendorRepository")  private _vendorRepo : IVendorRepository,
        @inject("IWorkSampleRepository") private _workSampleRepo : IWorkSampleRepository
    ){}


    async execute(data: IWorksampleDTO, vendorId: string): Promise<void> {
        
        
          const vendor = await this._vendorRepo.findById(vendorId)

        if(!vendor){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this._workSampleRepo.save(data)
    }
}