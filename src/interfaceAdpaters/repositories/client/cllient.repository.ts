import { injectable } from "tsyringe";
import { IClientEntity } from "@entities/models/client.entity";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";


import { ClientModel  } from "@frameworks/database/Mongodb/models/client.model";
import { FilterQuery, ObjectId } from "mongoose";

@injectable()
export class ClientRepository implements IClientRepository{
    async save(data: Partial<IClientEntity>): Promise<IClientEntity> {
        return await ClientModel.create(data)
    }

    async findByEmail(email: string): Promise<IClientEntity | null> {
        return await ClientModel.findOne({email})
    }

   async  findById(id: string): Promise<IClientEntity | null> {
        return await ClientModel.findById(id)
    }

   async  findByIdAndUpdatePassword(id: ObjectId, password: string): Promise<void> {
         await ClientModel.findByIdAndUpdate(id,{
            password:password
        })
    }

    async findByIdAndChangePassword(clientId: string, password: string): Promise<void> {
        
        await ClientModel.findByIdAndUpdate(clientId,{
            password:password
        });
        
    }

    async findByIdAndUpdateStatus(id: string, status: string): Promise<void> {
        await ClientModel.findByIdAndUpdate(id,{
            $set:{
                status:status
            }
            
        })
    }

    async findByIdAndUpdateProfileImage(userId: string, profileImage: string): Promise<void> {
        await ClientModel.findByIdAndUpdate(userId,
            {
                $set:{profileImage:profileImage},
                
            },
            {new:true}
        )
    };


    async findByIdAndUpdateProfileInformation(userId: string,updateData:Partial<IClientEntity>): Promise<void> {
        
        await ClientModel.findByIdAndUpdate(userId,
            updateData,
            {
                new : true
            }
        )
    }

        async findPaginatedClients(filter:FilterQuery<IClientEntity>,skip:number,limit:number):Promise<{user:IClientEntity[] | []; total:number}> {
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
