import { IRatingEntity } from "@entities/models/rating.entity";
import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { ratingModel } from "@frameworks/database/Mongodb/models/rating.model";
import { GetAllRatingsWithAverageDTO, IEditRatingDTO, RatingRequestDTO } from "@shared/dtos/rating.dto";
import mongoose from "mongoose";


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


   async getRatingsByClientId(clientId: string): Promise<IRatingEntity | null> {
       return await ratingModel.findOne({clientId:clientId})
   }


   async getAllRatingsWithAverage(serviceId:string) : Promise<GetAllRatingsWithAverageDTO> {
       
         const result = await ratingModel.aggregate([
    { $match: { serviceId: new mongoose.Types.ObjectId(serviceId) } },
    {
      $lookup: {
        from: "clients",
        localField: "clientId",
        foreignField: "_id",
        as: "clientDetails",
      },
    },
    { $unwind: "$clientDetails" },
    {
      $group: {
        _id: "$serviceId",
        averageRating: { $avg: "$rating" },
        totalRatings: { $sum: 1 },
        reviews: {
          $push: {
            clientId: "$clientId",
            clientName: "$clientDetails.name",
            profileImage: "$clientDetails.profileImage",
            rating: "$rating",
            description: "$description",
            reviewId: "$_id",
            createdAt: "$createdAt",
          },
        },
      },
    },
  ]);

        return result[0]
   }


   async findRatingByIdAndEditRating(ratingId: string, data: IEditRatingDTO): Promise<void> {
       
        await ratingModel.findByIdAndUpdate(ratingId,
            {
                $set:data
            },
            {new:true}
        )
   }


   async findRatingByIdAndRemove(ratingId: string): Promise<void> {
        await ratingModel.findByIdAndDelete(ratingId)
   }
}