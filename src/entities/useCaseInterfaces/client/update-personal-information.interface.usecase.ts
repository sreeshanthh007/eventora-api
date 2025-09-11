import { IClientEntity } from "@entities/models/client.entity";


export interface IUpdatePersonalInformationUseCase {
     execute(userId:string,updateData:Partial<IClientEntity>) : Promise<void>
}

