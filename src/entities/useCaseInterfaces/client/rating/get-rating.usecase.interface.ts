import { RatingDTO } from "@shared/dtos/rating.dto";


export interface IGetRatingUseCase{
    execute(clientId:string,serviceId:string) : Promise<RatingDTO>
}