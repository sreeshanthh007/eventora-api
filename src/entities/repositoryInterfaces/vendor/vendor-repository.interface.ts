import { IVendorModel } from "@frameworks/database/Mongodb/models/vendor.model";
import { IVendorEntity } from "@entities/models/vendor.entity";

export interface IVendorRepository{
    save(data:Partial<IVendorEntity>) : Promise<IVendorEntity>

    findByEmail(email:string) : Promise<IVendorEntity | null> 

    findById(id:string) : Promise<IVendorEntity | null>

    findByIdAndUpdatePassword(id:any,password:string) : Promise<void>

    findByIdAndUpdateStatus(id:any,status:string) : Promise<void>

    findPaginatedClients(filter:any,skip:number,limit:number) : Promise<{user:IVendorEntity[] | []; total:number}>
    
    
}