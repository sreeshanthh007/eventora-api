
import { IBookingEntity } from "@entities/models/booking.entity";
import { IClientEntity } from "@entities/models/client.entity";
import { TBookingEntityWithPopulatedBookingDetailsForAdmin, TServiceEntityWithPopulatedVendorForClient } from "@entities/models/populated-types/service-populated.type";
import { IServiceEntity } from "@entities/models/service.entity";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { EditableServiceFields } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";
import { bookingModel } from "@frameworks/database/Mongodb/models/booking.model";
import { serviceModel } from "@frameworks/database/Mongodb/models/service.model";
import { FilterQuery } from "mongoose";



export class ServiceRepository implements IServiceRepository{
     async save(data: IServiceEntity): Promise<void> {
    await serviceModel.create(data);
  }


  async findById(id: string): Promise<IServiceEntity | null> {
      return await serviceModel.findById(id)
  }


  async getServiceDetails(serviceId: string): Promise<TServiceEntityWithPopulatedVendorForClient | null> {
      
    const service =   await serviceModel.findOne({ _id: serviceId })
       .populate<{ vendorId: Pick<IVendorEntity, "_id" | "name"  | "profilePicture" | "place" | "email"> }>({
            path: "vendorId",
            select: "_id name  profilePicture place email",
        })
        .lean();
        
        if(!service) return null

    const mappedService : TServiceEntityWithPopulatedVendorForClient = {
      ...service!,
      vendorId:{
        _id:service!.vendorId._id!.toString(),
        name:service!.vendorId.name!,
        email:service!.vendorId.email!,
        place: service?.vendorId.place || "", 
       profilePicture: service?.vendorId.profilePicture || "",
      }
    }

    return mappedService
  } 



  async getServiceBookingsofVendors(skip: number, limit: number, search: string, filterType: string): Promise<{ bookings: TBookingEntityWithPopulatedBookingDetailsForAdmin[] | []; total: number; }> {
      
      const filter : FilterQuery<IBookingEntity> = {}

      if(filterType){
        filter.status = filterType
      }

      if(search){
        filter.$or = [
          {email:{$regex:search,$options:"i"}},
          {name:{$regex:search,$options:"i"}}
        ]
      }


    const [bookings, total] = await Promise.all([
    bookingModel
      .find(filter)
      .populate<{ clientId: IClientEntity }>({
        path: "clientId",
        select: "name email phone profilePicture"
      })
      .populate<{ vendorId: IVendorEntity }>({
        path: "vendorId",
        select: "name email profilePicture"
      })
      .populate<{ serviceId: IServiceEntity }>({
        path: "serviceId",
        select: "serviceTitle servicePrice"
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    bookingModel.countDocuments(filter)
  ]);

  return {
    bookings: bookings as TBookingEntityWithPopulatedBookingDetailsForAdmin[],
    total
  }
  }

  async findServicesProvidedByVendors(vendorId: string): Promise<IServiceEntity[] | null> {
      
    return await serviceModel.find({vendorId,status:"active"});
  }
  async findByIdAndUpdate(id: string, data: EditableServiceFields): Promise<void> {
      await serviceModel.findByIdAndUpdate(id,data,
        {
          new:true
        }
      );
  }


  async findByIdAndUpdateStatus(serviceId: string, status: string): Promise<void> {
      await serviceModel.findByIdAndUpdate(serviceId,
        {$set:{status:status}},
        {new:true}
      )
  }

  async getAllServices(filter: FilterQuery<IServiceEntity>, skip: number, limit: number): Promise<{ services: IServiceEntity[] | []; total: number; }> {
      const [services,total] = await Promise.all([
        serviceModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
        serviceModel.countDocuments(filter)
      ]);

      return {
        services,
        total
      }
  }

 async findFIlteredSevices(filters: { search?: string; sort?: string;categoryId?:string }, skip: number, limit: number): Promise<{ services: IServiceEntity[] | []; total: number; }> {

      const {search,sort,categoryId} = filters

      const filter : FilterQuery<IServiceEntity> = {status:"active"}

      if(search){
        filter.$or = [
          {serviceTitle:{$regex:search,$options:"i"}}
        ];
      }


          if (categoryId) {
        filter.categoryId = filters.categoryId;
      }


      let sortStage : Record<string,1 | -1> = {}

      switch(sort){
        case "price-low" :
          sortStage = {"servicePrice":1}
          break;
        case "price-high" :
          sortStage = {"servicePrice":-1}
          break;
        case "name-asc" :
          sortStage = {"serviceTitle":1}
          break;
        case "name-desc" :
          sortStage = {"serviceTitle":-1}
          break;
      };

      const [services,total] = await Promise.all([
        serviceModel.aggregate([
          {$match:filter},

          {
            $lookup:{
              from:"categories",
              localField:"categoryId",
              foreignField:"categoryId",
              as:"category"
            }
          },

          {$unwind:"$category"},
          {$sort:sortStage},
          {$skip:skip},
          {$limit:limit},

          {
            $project:{
              serviceTitle:1,
              serviceDescription:1,
              yearsOfExperience:1,
              servicePrice:1,
              categoryName:"$category.title",

            }
          }
        ]),

        serviceModel.countDocuments(filter)
      ]);
      return {
        services,
        total
      }
 }

  async findByIdAndUpdateBookedCount(serviceId: string, startDateTime: Date, endDateTime: Date): Promise<void> {
       await serviceModel.findOneAndUpdate(
    {
      _id: serviceId,
      slots: { $elemMatch: { startDateTime, endDateTime } },
    },
    { $inc: { "slots.$.bookedCount": 1 } }
  );
  }
}