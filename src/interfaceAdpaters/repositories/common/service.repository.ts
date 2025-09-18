import { IServiceEntity } from "@entities/models/service.entity";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { EditableServiceFields } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";
import { serviceModel } from "@frameworks/database/Mongodb/models/service.model";
import { FilterQuery } from "mongoose";


export class ServiceRepository implements IServiceRepository{
     async save(data: IServiceEntity): Promise<void> {
    await serviceModel.create(data);
  }

  async findById(id: string): Promise<IServiceEntity | null> {
      return await serviceModel.findById(id)
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

 async findFIlteredSevices(filters: { search?: string; sort?: string; }, skip: number, limit: number): Promise<{ services: IServiceEntity[] | []; total: number; }> {

      const {search,sort} = filters

      const filter : FilterQuery<IServiceEntity> = {}

      if(search){
        filter.$or = [
          {serviceTitle:{$regex:search,$options:"i"}}
        ];
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


}