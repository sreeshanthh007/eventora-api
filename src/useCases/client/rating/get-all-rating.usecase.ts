import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetAllRatingsWithAverageUseCase } from "@entities/useCaseInterfaces/client/rating/get-rating.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { GetAllRatingsWithAverageDTO } from "@shared/dtos/rating.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllRatingsWithAverageUseCase implements IGetAllRatingsWithAverageUseCase{

    constructor(
        @inject("IRatingRepository") private _ratingRepo : IRatingRepository,
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}


    async execute(serviceId: string): Promise<GetAllRatingsWithAverageDTO> {
        
        const service = await this._serviceRepo.findById(serviceId)

        if(!service){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const ratings = await this._ratingRepo.getAllRatingsWithAverage(serviceId);



        return ratings

        
    }
}