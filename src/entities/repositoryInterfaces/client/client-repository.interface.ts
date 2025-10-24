import { FilterQuery, ObjectId } from "mongoose";
import { IClientEntity } from "@entities/models/client.entity";

export interface IClientRepository  {
    save(data:Partial<IClientEntity>) : Promise<IClientEntity>

    findByEmail(email:string) : Promise<IClientEntity | null>


    findById(id:string) : Promise<IClientEntity | null>

    findByIdandSaveFcmToken(id:string,fcmtoken:string) : Promise<void>

    findByIdAndUpdatePassword(id:ObjectId,password:string) : Promise<void>
    
    findByIdAndChangePassword(clientId:string,password:string) : Promise<void>

    findByIdAndUpdateStatus(id:string,status:string) : Promise<void>

    findPaginatedClients(filter:FilterQuery<IClientEntity>,skip:number,limit:number) : Promise<{user:IClientEntity[] | []; total:number}>

    findByIdAndUpdateProfileImage(userId:string,profileImage:string) : Promise<void>

    findByIdAndUpdateProfileInformation(userId:string,updateData:Partial<IClientEntity>) : Promise<void>
}   