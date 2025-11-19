import { IAdminEntity } from "@entities/models/admin.entity";
import { IAdminRepository } from "@entities/repositoryInterfaces/admin/admin-repository-interface";
import { AdminModel } from "@frameworks/database/mongodb/models/admin.model";
import { bookingModel } from "@frameworks/database/mongodb/models/booking.model";
import { categoryModel } from "@frameworks/database/mongodb/models/category.model";
import { ClientModel } from "@frameworks/database/mongodb/models/client.model";
import { VendorModel } from "@frameworks/database/mongodb/models/vendor.model";
import { walletModel } from "@frameworks/database/mongodb/models/wallet.model";
import { AdminAnalyticsResponseDTO } from "@shared/dtos/admin-analytics.dto";
import { getDateRange } from "@shared/utils/get-date-range.helper";
import { injectable } from "tsyringe";

@injectable()
export class AdminRepository implements IAdminRepository {
  async save(data: Partial<IAdminEntity>): Promise<IAdminEntity> {
    return await AdminModel.create(data);
  }

  async findByEmail(email: string): Promise<IAdminEntity | null> {
    return await AdminModel.findOne({ email });
  }

  async getAnalyticsDashboard(period: string, startDate?: Date, endDate?: Date): Promise<AdminAnalyticsResponseDTO> {
      
        const { start, end } = getDateRange(period, startDate, endDate)



      const revenueAgg = await walletModel.aggregate([

         { $match: { userType: "admin" } },
         {$unwind:"$transactions"},
         {
          $match:{
            "transactions.paymentStatus":"credit",
            "transactions.date":{$gte:start,$lte:end}
          }
         },
         {
          $group:{
            _id:"$transactions.date",
            totalRevenue:{$sum:"$transactions.amount"}
          }
         },

         {$sort:{_id:1}}
      ])

      const totalRevenue = revenueAgg.reduce((acc,curr)=>acc+curr.totalRevenue,0)


      const [totalVendors,verifiedVendors,blockedVendors,topVendorsAgg] = await Promise.all([

        VendorModel.countDocuments(),
        VendorModel.countDocuments({vendorStatus:"approved"}),
        VendorModel.countDocuments({status:"active"}),

        bookingModel.aggregate([
          {
            $match:{
              paymentStatus:"successfull",
              createdAt: { $gte: start, $lte: end }
            }
          },

          {
            $group:{
              _id:"$vendorId",
              totalRevenue:{$sum:"$amount"}
            }
          },

          {
            $lookup:{
              from:"vendors",
              localField:"_id",
              foreignField:"_id",
              as:"vendor"
            }
          },

          {$unwind:"$vendor"},

          {
            $project:{
              _id:0,
              vendorName:"$vendor.name",
              revenue:"$totalRevenue",
              profilePicture:"$vendor.profilePicture"
            }
          },

          {$sort:{revenue:-1}},
          {$limit:5}
        ])
      ])

      const totalVendorRevenue = topVendorsAgg.reduce((acc,curr)=>acc+curr.revenue,0)
      const topVendors = topVendorsAgg.map((v)=>({
        name:v.vendorName,
        revenue:v.revenue,
        profilePicture:v.profilePicture,
        percentage: totalVendorRevenue ? ((v.revenue / totalVendorRevenue) * 100).toFixed(1) : 0
      }))

      const vendorStats = {
        totalVendors,
        verifiedVendors,
        unverifiedVendors:totalVendors - verifiedVendors,
        activeVendors:totalVendors - blockedVendors,
        blockedVendors,
        topVendors
      }


      const [totalClients,blockedClients] = await Promise.all([
        ClientModel.countDocuments(),
        ClientModel.countDocuments({status:"blocked"})
      ])

      const clientStats = {
        totalClients,
        activeClients : totalClients - blockedClients,
        blockedClients
      }


      const categoryAgg = await bookingModel.aggregate([
        {
          $match:{
            paymentStatus:"successfull",
             createdAt: { $gte: start, $lte: end }
          }
        },

        {
          $lookup:{
            from:"services",
            localField:"serviceId",
            foreignField:"_id",
            as:"service"
          }
        },

        {$unwind:"$service"},

        {
          $lookup:{
            from:"categories",
            localField:"service.categoryId",
            foreignField:"categoryId",
            as:"category"
          }
        },
        {$unwind:"$category"},

        {
          $group:{
            _id:"$category.title",
            revenue:{$sum:"$amount"}
          }
        },
        {$sort:{revenue:-1}}
      ])

      const totalCategoryRevenue = categoryAgg.reduce((acc,curr)=>acc+curr.revenue,0)
      const categoryInsights = categoryAgg.map((c)=>({
        categoryName:c._id,
        revenue:c.revenue,
       percentageOfTotal: totalCategoryRevenue
        ? Number(((c.revenue / totalCategoryRevenue) * 100).toFixed(1))
        : 0,
      growth: "+0%"
      }))

      const totalCategories = await categoryModel.countDocuments();

     const overview = {
      totalClients,
      totalVendors,
      verifiedVendors,
      blockedVendors,
      totalCategories,
      totalRevenue
    }

    return {
      data:{
        overview,
        revenue:{
          totalRevenue,
          chartData:revenueAgg.map((r)=>({
            date:r._id,
            revenue:r.totalRevenue,
          }))
        },
        vendorStats:vendorStats,
        clientStats,
        categoryInsights
      }
    }


  }
}