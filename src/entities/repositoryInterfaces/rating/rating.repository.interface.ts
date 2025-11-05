import { IRatingEntity } from "@entities/models/rating.entity";
import { GetAllRatingsWithAverageDTO, IEditRatingDTO, RatingRequestDTO } from "@shared/dtos/rating.dto";


export interface IRatingRepository{
    findbyId(ratingId:string) : Promise<IRatingEntity | null>
    addRating(clientId:string,serviceId:string,data:RatingRequestDTO) : Promise<void>
    getRatingsByClientId(clientId:string) : Promise<IRatingEntity | null>
    getAllRatingsWithAverage(serviceId:string) : Promise<GetAllRatingsWithAverageDTO>
    findRatingByIdAndEditRating(ratingId:string,data:IEditRatingDTO) : Promise<void>
    findRatingByIdAndRemove(ratingId:string) : Promise<void>
}