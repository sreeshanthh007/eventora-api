
import { TBookingEntityWithPopulatedBookingDetailsForAdmin, TServiceEntityWithPopulatedVendorForAdmin, TServiceEntityWithPopulatedVendorForClient } from "@entities/models/populated-types/service-populated.type";
import { IServiceEntity } from "@entities/models/service.entity";
import { type EditableServiceFields } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";


export interface IServiceRepository {
  save(data: IServiceEntity): Promise<void>;


  findById(id: string): Promise<IServiceEntity | null>;

  findServicesProvidedByVendors(vendorId:string) : Promise<IServiceEntity[] | null>

  findByIdAndUpdate(id: string, data: EditableServiceFields): Promise<void>;

  getAllServices(search:string,skip:number,limit:number,vendorId?:string) : Promise<{services:IServiceEntity[] | [];  total:number}>


  getServiceBookingsofVendors(skip:number,limit:number,search:string,filterType:string) : Promise<{bookings:TBookingEntityWithPopulatedBookingDetailsForAdmin[] | []; total:number}>

  getServiceDetails(serviceId:string) : Promise<TServiceEntityWithPopulatedVendorForClient | null>

  findFIlteredSevices(filters:{search?:string,sort?:string,categoryId?:string},skip:number,limit:number) : Promise<{services:IServiceEntity[] | [] ; total:number}>
  
  findServicesofVendorsForAdmin(skip:number,limit:number,search:string,filterBy:string) : Promise<{services:TServiceEntityWithPopulatedVendorForAdmin[] | []; total:number}>
  
  findByIdAndUpdateStatus(serviceId:string,status:string) : Promise<void>

  findByIdAndUpdateBookedCount(serviceId:string,startDateTime:Date,endDateTime:Date) : Promise<void>

  findExpiredSlots(currentDate:Date) : Promise<IServiceEntity[] | null>


} 