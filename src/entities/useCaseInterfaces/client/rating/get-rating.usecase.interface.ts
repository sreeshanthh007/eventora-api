import { GetAllRatingsWithAverageDTO } from "@shared/dtos/rating.dto";


export interface IGetAllRatingsWithAverageUseCase{
    execute(serviceId:string) : Promise<GetAllRatingsWithAverageDTO>
}