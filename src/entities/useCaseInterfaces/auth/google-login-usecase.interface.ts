import { IUserEntity } from "@entities/models/user.entity";


export interface IGoogleUseCase{
    execute(
        credential:string,
        client_id:string,
        role:any
    ) : Promise<Partial<IUserEntity>>
}