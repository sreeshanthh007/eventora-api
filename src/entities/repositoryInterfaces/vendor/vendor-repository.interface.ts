
import { IVendorEntity } from "@entities/models/vendor.entity";
import { FilterQuery, ObjectId } from "mongoose";


export interface IVendorRepository{
    save(data:Partial<IVendorEntity>) : Promise<IVendorEntity>

    findByEmail(email:string) : Promise<IVendorEntity | null> 

    findById(id:string) : Promise<IVendorEntity | null>

    findByIdAndUpdatePassword(id:ObjectId,password:string) : Promise<void>

    findByIdAndUpdateStatus(id:string,status:string) : Promise<void>

    findByIdAndUpdateVendorStatus(id:string,status:string,rejectReason?:string) : Promise<void> 

     findByIdandSaveFcmToken(id:string,fcmtoken:string) :Promise<void>

    findPaginatedClients(filter:FilterQuery<IVendorEntity>,skip:number,limit:number) : Promise<{user:IVendorEntity[] | []; total:number}>
    
    findPaginatedVendorByStatus(filter:FilterQuery<IVendorEntity>,skip:number,limit:number) :  Promise<{vendors:IVendorEntity[] | []; total:number}>

     findByIdAndUpdateProfileImage(userId:string,profileImage:string) : Promise<void>

    updatePersonalInformation(id:string,data:Partial<IVendorEntity>) : Promise<void>
}