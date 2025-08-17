import { IVendorModel } from "@frameworks/database/Mongodb/models/vendor.model";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { FilterQuery, ObjectId } from "mongoose";


export interface IVendorRepository{
    save(data:Partial<IVendorEntity>) : Promise<IVendorEntity>

    findByEmail(email:string) : Promise<IVendorEntity | null> 

    findById(id:string) : Promise<IVendorEntity | null>

    findByIdAndUpdatePassword(id:ObjectId,password:string) : Promise<void>

    findByIdAndUpdateStatus(id:string,status:string) : Promise<void>

    findByIdAndUpdateVendorStatus(id:string,status:string) : Promise<void> 

    findPaginatedClients(filter:FilterQuery<IVendorEntity>,skip:number,limit:number) : Promise<{user:IVendorEntity[] | []; total:number}>
    
    findPaginatedVendorByStatus(filter:FilterQuery<IVendorEntity>,skip:number,limit:number) :  Promise<{vendors:IVendorEntity[] | []; total:number}>

    updateVendorProfileById(id:string,data:Partial<IVendorEntity>) : Promise<void>
}