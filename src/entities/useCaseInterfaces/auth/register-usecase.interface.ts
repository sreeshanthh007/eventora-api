import { IUserEntity } from "@entities/models/user.entity";

export interface IRegisterUseCase{
    execute(user:Partial<IUserEntity>) : Promise<void>
}

