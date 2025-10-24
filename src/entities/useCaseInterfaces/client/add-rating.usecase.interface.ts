import { RatingRequestDTO } from "@shared/dtos/rating.dto";

export interface IAddRatingUseCase{
    execute(clientId:string,serviceId:string,data:RatingRequestDTO) : Promise<void>
}