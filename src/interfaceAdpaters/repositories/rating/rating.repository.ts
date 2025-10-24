import { IRatingEntity } from "@entities/models/rating.entity";
import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { ratingModel } from "@frameworks/database/Mongodb/models/rating.model";
import { IEditRatingDTO, RatingRequestDTO } from "@shared/dtos/rating.dto";


export class RatingRepository implements IRatingRepository{


    async findbyId(ratingId: string): Promise<IRatingEntity | null> {
        return await ratingModel.findById(ratingId)
    }

   async addRating(clientId: string, serviceId: string, data: RatingRequestDTO): Promise<void> {
       
    await ratingModel.create({
        clientId,
        serviceId,
        ...data
    });
   }


   async getRatingByClientId(clientId: string): Promise<IRatingEntity | null> {
       return await ratingModel.findOne({clientId:clientId});
   }


   async findRatingByIdAndEditRating(ratingId: string, data: IEditRatingDTO): Promise<void> {
       
        await ratingModel.findByIdAndUpdate(ratingId,
            {
                $set:data
            },
            {new:true}
        )
   }
}