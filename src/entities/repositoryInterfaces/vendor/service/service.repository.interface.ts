// import { IServiceTestEntity } from "@entities/models/service-test.entity";
import { IServiceEntity } from "@entities/models/service.entity";
import { type EditableServiceFields } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";
import { FilterQuery } from "mongoose";


export interface IServiceRepository {
  save(data: IServiceEntity): Promise<void>;


  findById(id: string): Promise<IServiceEntity | null>;

  findServicesProvidedByVendors(vendorId:string) : Promise<IServiceEntity[] | null>

  findByIdAndUpdate(id: string, data: EditableServiceFields): Promise<void>;

  getAllServices(filter:FilterQuery<IServiceEntity>,skip:number,limit:number) : Promise<{services:IServiceEntity[] | [];  total:number}>

  findFIlteredSevices(filters:{search?:string,sort?:string,categoryId?:string},skip:number,limit:number) : Promise<{services:IServiceEntity[] | [] ; total:number}>

  findByIdAndUpdateStatus(serviceId:string,status:string) : Promise<void>

  findByIdAndUpdateBookedCount(serviceId:string,startDateTime:Date,endDateTime:Date) : Promise<void>

} 