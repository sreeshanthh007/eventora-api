import { IUserEntity } from "@entities/models/user.entity";

export interface ILoginUserCase {
    execute(user:Partial<IUserEntity>) : Promise<Partial<IUserEntity>>
}