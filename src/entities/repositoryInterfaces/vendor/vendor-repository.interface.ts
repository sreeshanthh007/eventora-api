
import { IVendorEntity } from "@entities/models/vendor.entity";
import { VendorAnalyticsDashboardResponseDTO } from "@shared/dtos/vendor-analytics.dto";
import {  ObjectId } from "mongoose";


export interface IVendorRepository{
    save(data:Partial<IVendorEntity>) : Promise<IVendorEntity>

    findByEmail(email:string) : Promise<IVendorEntity | null> 

    findById(id:string) : Promise<IVendorEntity | null>

    findByIdAndUpdatePassword(id:ObjectId,password:string) : Promise<void>

    changePassword(vendorId:string,password:string) : Promise<void>

    findByIdAndUpdateStatus(id:string,status:string) : Promise<void>

    findByIdAndUpdateVendorStatus(id:string,status:string,rejectReason?:string) : Promise<void> 

     findByIdandSaveFcmToken(id:string,fcmtoken:string) :Promise<void>

    findPaginatedVendors(search:string,skip:number,limit:number) : Promise<{user:IVendorEntity[] | []; total:number}>
    
    findPaginatedVendorByStatus(search:string,skip:number,limit:number) :  Promise<{vendors:IVendorEntity[] | []; total:number}>

     findByIdAndUpdateProfileImage(userId:string,profileImage:string) : Promise<void>

    updatePersonalInformation(id:string,data:Partial<IVendorEntity>) : Promise<void>

    getVendorAnalyticsDashboard(vendorId:string,period:string,startDate?:Date,endDate?:Date) : Promise<VendorAnalyticsDashboardResponseDTO>
}