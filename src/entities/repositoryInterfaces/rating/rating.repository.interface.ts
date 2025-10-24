import { IRatingEntity } from "@entities/models/rating.entity";
import { IEditRatingDTO, RatingRequestDTO } from "@shared/dtos/rating.dto";


export interface IRatingRepository{
    findbyId(ratingId:string) : Promise<IRatingEntity | null>
    addRating(clientId:string,serviceId:string,data:RatingRequestDTO) : Promise<void>
    getRatingByClientId(clientId:string) : Promise<IRatingEntity | null>
    findRatingByIdAndEditRating(ratingId:string,data:IEditRatingDTO) : Promise<void>
}