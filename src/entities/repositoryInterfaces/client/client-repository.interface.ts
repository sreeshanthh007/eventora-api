import { ObjectId } from "mongoose";
import { IClientEntity } from "@entities/models/client.entity";
import { IClientModel } from "@frameworks/database/Mongodb/models/client.model";



export interface IClientRepository {
    save(data:Partial<IClientEntity>) : Promise<IClientEntity>

    findByEmail(email:string) : Promise<IClientEntity | null>


    findById(id:any) : Promise<IClientEntity | null>


    findByIdAndUpdatePassword(id:any,password:string) : Promise<void>

    findByIdAndUpdateStatus(id:any,status:string) : Promise<void>

    findPaginatedClients(filter:any,skip:number,limit:number) : Promise<{user:IClientEntity[] | []; total:number}>

    
}