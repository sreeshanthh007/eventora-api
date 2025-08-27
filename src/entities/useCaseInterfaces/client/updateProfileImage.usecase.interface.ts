import { TRole } from "@shared/constants";


export interface IUpdateProfileImageUseCase{
    execute(userId:string,imgUrl:string,role:TRole) : Promise<void>
}