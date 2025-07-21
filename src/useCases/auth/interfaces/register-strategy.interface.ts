
import { UserDTO } from "@shared/dtos/user.dto";
import { IUserEntity } from "@entities/models/user.entity";


export interface IRegisterStrategy {
  register(user: UserDTO): Promise<IUserEntity | void>;
}

