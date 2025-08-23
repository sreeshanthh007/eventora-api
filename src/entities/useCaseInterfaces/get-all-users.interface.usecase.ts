import { IClientEntity } from "@entities/models/client.entity";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { TRole } from "@shared/constants";


export interface IGetAllUsersDetailsUseCase{
    execute(userId:string,role:TRole) : Promise<IClientEntity | IVendorEntity>
}