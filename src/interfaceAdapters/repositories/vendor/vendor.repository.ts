import { injectable } from "tsyringe";
import {
  VendorModel,
} from "@frameworks/database/mongodb/models/vendor.model";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IVendorEntity } from "@entities/models/vendor.entity";
import mongoose, { FilterQuery, ObjectId } from "mongoose";
import { VendorAnalyticsDashboardResponseDTO } from "@shared/dtos/vendor-analytics.dto";
import { getDateRange } from "@shared/utils/get-date-range.helper";
import { bookingModel } from "@frameworks/database/mongodb/models/booking.model";
import { EventModel } from "@frameworks/database/mongodb/models/event.model";
import { ratingModel } from "@frameworks/database/mongodb/models/rating.model";
import { walletModel } from "@frameworks/database/mongodb/models/wallet.model";



@injectable()
export class VendorRepository implements IVendorRepository {
  async save(data: Partial<IVendorEntity>): Promise<IVendorEntity> {
    return await VendorModel.create(data);
  }

  async findByEmail(email: string): Promise<IVendorEntity | null> {
    return await VendorModel.findOne({ email });
  }

  async findById(id: string): Promise<IVendorEntity | null> {
    return await VendorModel.findById(id);
  }

  async findByIdAndUpdateStatus(id: string, status: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, {
      $set: {
        status: status,
      },
      
    });
  }


  async changePassword(vendorId: string, password: string): Promise<void> {
      await VendorModel.findByIdAndUpdate(vendorId,{
        $set:{password:password}
      });
  }

  async findByIdandSaveFcmToken(id: string, fcmtoken: string): Promise<void> {
      await VendorModel.findByIdAndUpdate(id,
        {
          fcmToken:fcmtoken
        }
      )
  }

  async findByIdAndUpdatePassword(id: ObjectId, password: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, {
      $set: {
        password: password,
      },
    });
  }

  async findPaginatedVendors(
    search:string,
    skip: number,
    limit: number
  ): Promise<{ user: IVendorEntity[] | []; total: number }> {
    
    const filter: FilterQuery<IVendorEntity> = {}
    
    if(search){
      filter.$or = [
        { name: {$regex:search,$options:"i"} },
        { email: {$regex:search,$options:"i"} }
      ]
    }
    const [user, total] = await Promise.all([
      VendorModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      VendorModel.countDocuments(filter),
    ]);

    return {
      user,
      total,
    };
  }

  async findPaginatedVendorByStatus( search:string, skip: number, limit: number): Promise<{ vendors: IVendorEntity[] | []; total: number; }> {
    
    const filter: FilterQuery<IVendorEntity> = {}
    
    if(search){
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
      
    }
      const [vendors,total] = await Promise.all([
        VendorModel.find(filter)
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit),
        VendorModel.countDocuments(filter)
      ]);
      return {
        vendors,
        total
      }
  }


  async findByIdAndUpdateProfileImage(userId: string, profileImage: string): Promise<void> {
      await VendorModel.findByIdAndUpdate(userId,
        {
          $set:{profilePicture : profileImage}
        }
      )
  }

  async updatePersonalInformation(id: string, data: Partial<IVendorEntity>): Promise<void> {
     await VendorModel.findByIdAndUpdate(id,data,
      {
        new:true
      }
     )

  }

  async findByIdAndUpdateVendorStatus(id: string, status: string,rejectReason?:string): Promise<void> {
      await VendorModel.findByIdAndUpdate(id,{
        $set:{
          vendorStatus:status,
          rejectionReason:rejectReason
        }
      });
  }


  async getVendorAnalyticsDashboard(vendorId: string, period: string, startDate?: Date, endDate?: Date): Promise<VendorAnalyticsDashboardResponseDTO> {
      
        const {start,end} = getDateRange(period,startDate,endDate)

        const [totalBookings,upcomingBookings,totalEvents,upcomingEvents,avgRatingAgg,revenueAgg] = await Promise.all([

          bookingModel.countDocuments({vendorId,paymentStatus:"successfull",createdAt: { $gte: start, $lte: end }}),
          bookingModel.countDocuments({vendorId,paymentStatus:"successfull",createdAt: { $gte: start, $lte: end },"bookingSlot.startDate":{$gte:new Date()}}),
          EventModel.countDocuments({hostId:vendorId}),
          EventModel.countDocuments({hostId:vendorId,status:"upcoming"}),
          ratingModel.aggregate([
            {
              $lookup:{
                from:"services",
                localField:"serviceId",
                foreignField:"_id",
                as:"service"
              }
            },

            {$unwind:"$service"},
            {$match:{"service.vendorId":vendorId}},
            {$group:{_id:null,avgRating:{$avg:"$rating"}}},
          ]),

          walletModel.aggregate([
            {
              $match:{
                userId:vendorId,
                userType:"vendor"
              }
            },
            {$unwind:"$transactions"},

            {
              $match:{
                "transactions.date":{$gte:start,$lte:end},
                "transactions.paymentStatus":"credit"
              }
            },

            {
              $group:{
                _id:null,
                totalRevenue:{$sum:"$transactions.amount"}
              }
            }
          ])
        ])

        const overview = {
          totalRevenue : revenueAgg[0] ?.totalRevenue || 0,
          totalBookings,
          upcomingBookings,
          upcomingEvents,
          totalEvents,
          averageRating:avgRatingAgg[0]?.avgRating || 0
        }

        const revenueChart = await walletModel.aggregate([
          {$match:{userId:vendorId,userType:"vendor"}},
          {$unwind:"$transactions"},
          {
            $match:{
              "transactions.date":{$gte:start,$lte:end},
              "transactions.paymentStatus":"credit"
            }
          },

          {
          $group: {
            _id: "$transactions.date",
            revenue: { $sum: "$transactions.amount" }
          }
        },
           { $sort: { "_id": 1 } }
    ])

    const revenue = {
      totalRevenue : overview.totalRevenue,
      chartData: revenueChart.map(item => ({
      date: new Date(item._id),
      revenue: item.revenue
    }))
    }


    const servicePerformance = await bookingModel.aggregate([
     {
       $match: { 
          vendorId: new mongoose.Types.ObjectId(vendorId), 
          paymentStatus: "successfull" 
        } 
      },
      {
        $group:{
          _id:"$serviceId",
          totalBookings:{$sum:1},
          revenue:{$sum:"$amount"}
        }
      },

      {
        $lookup:{
          from:"services",
          localField:"_id",
          foreignField:"_id",
          as:"service"
        }
      },
          { $unwind: "$service" },

          {
    
        $match: {
          $expr: {
            $eq: ["$service.vendorId", vendorId]
          }
        }
      },
        {
          $lookup:{
            from:"ratings",
            localField:"_id",
            foreignField:"serviceId",
            as:"ratings"
          }
        },
        {
          $addFields:{
            averageRating:{$avg:"$ratings.rating"}
          }
        },

        {
          $project:{
            _id:0,
            serviceTitle:"$service.serviceTitle",
            totalBookings:1,
            revenue:1,
            averageRating:{$ifNull:["$averageRating",0]},
            status:"$service.status"
          }
        }
    ])

    const objVendorId = new mongoose.Types.ObjectId(vendorId)
    const bookingStatusAgg = await bookingModel.aggregate([

      {$match:{vendorId:objVendorId}},

      {$group:{_id:"$status",count:{$sum:1}}},
    ])


    const bookingAnalytics = {
    completed: bookingStatusAgg.find(b => b._id === "completed")?.count || 0,
    ongoing: bookingStatusAgg.find(b => b._id === "ongoing")?.count || 0,
    cancelled: bookingStatusAgg.find(b => b._id === "cancelled")?.count || 0,
    pending: bookingStatusAgg.find(b => b._id === "pending")?.count || 0
  }


 const eventAnalyticsAgg = await EventModel.aggregate([
      {
        $match: { hostId: new mongoose.Types.ObjectId(vendorId) }
      },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "eventId",
          as: "tickets"
        }
      },
      {
        $addFields: {
          ticketsSold: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$tickets",
                    as: "t",
                    cond: { $eq: ["$$t.paymentStatus", "successfull"] }
                  }
                },
                as: "validTicket",
                in: "$$validTicket.quantity"
              }
            }
          },
          ticketRevenue: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$tickets",
                    as: "t",
                    cond: { $eq: ["$$t.paymentStatus", "successfull"] }
                  }
                },
                as: "validTicket",
                in: "$$validTicket.amount"
              }
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          upcomingEvents: {
            $sum: { $cond: [{ $eq: ["$status", "upcoming"] }, 1, 0] }
          },
          completedEvents: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
          },
          cancelledEvents: {
            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] }
          },
          totalTicketsSold: { $sum: "$ticketsSold" },
          totalEventRevenue: { $sum: "$ticketRevenue" }
        }
      }
    ])

    const eventAnalytics = {
      totalEvents: eventAnalyticsAgg[0]?.totalEvents || 0,
      upcomingEvents: eventAnalyticsAgg[0]?.upcomingEvents || 0,
      completedEvents: eventAnalyticsAgg[0]?.completedEvents || 0,
      cancelledEvents: eventAnalyticsAgg[0]?.cancelledEvents || 0,
      totalTicketsSold: eventAnalyticsAgg[0]?.totalTicketsSold || 0,
      totalEventRevenue: eventAnalyticsAgg[0]?.totalEventRevenue || 0
    }


 const ratingDistribution = await ratingModel.aggregate([
  {
    $lookup:{
      from:"services",
      localField:"serviceId",
      foreignField:"_id",
      as:"service"
    }
  },

  {$unwind:"$service"},
  {$match:{"service.vendorId":vendorId}},
  {$group:{_id:"$rating",count:{$sum:1}}},
 ])
 
  const ratingInsights = {
    average: overview.averageRating,
    totalReviews: ratingDistribution.reduce((a, b) => a + b.count, 0),
    distribution: {
      "5": ratingDistribution.find(r => r._id === 5)?.count || 0,
      "4": ratingDistribution.find(r => r._id === 4)?.count || 0,
      "3": ratingDistribution.find(r => r._id === 3)?.count || 0,
      "2": ratingDistribution.find(r => r._id === 2)?.count || 0,
      "1": ratingDistribution.find(r => r._id === 1)?.count || 0
    }
  }

  return {
    data:{
      overview,
      revenue,
      servicePerformance,
      bookingAnalytics,
      eventAnalytics,
      ratingInsights
    }
  }
}
}
