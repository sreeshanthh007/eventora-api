import { injectable } from "tsyringe";
import { IClientEntity } from "@entities/models/client.entity";4
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";


import { ClientModel , IClientModel } from "@frameworks/database/Mongodb/models/client.model";

@injectable()
export class ClientRepository implements IClientRepository{
    async save(data: Partial<IClientEntity>): Promise<IClientEntity> {
        return await ClientModel.create(data)
    }

    async findByEmail(email: string): Promise<IClientEntity | null> {
        return await ClientModel.findOne({email})
    }

   async  findById(id: any): Promise<IClientEntity | null> {
        return await ClientModel.findById(id)
    }

   async  findByIdAndUpdatePassword(id: any, password: string): Promise<void> {
         await ClientModel.findByIdAndUpdate(id,{
            password:password
        })
    }

    async findByIdAndUpdateStatus(id: any, status: string): Promise<void> {
        await ClientModel.findByIdAndUpdate(id,{
            $set:{
                status:status
            }
            
        })
    }

        async findPaginatedClients(filter:any,skip:number,limit:number):Promise<{user:IClientEntity[] | []; total:number}> {
            const [user,total] = await Promise.all([
                ClientModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
                ClientModel.countDocuments(filter)
            ]);

            return {
                user,
                total
            }
        }
}
