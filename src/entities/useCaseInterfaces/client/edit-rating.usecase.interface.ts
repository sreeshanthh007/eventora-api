import { IEditRatingDTO } from "@shared/dtos/rating.dto";


export interface IEditRatingUseCase{
    execute(clientId:string,ratingId:string,data:IEditRatingDTO) : Promise<void>
}