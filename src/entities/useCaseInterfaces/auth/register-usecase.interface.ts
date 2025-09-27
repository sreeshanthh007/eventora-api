
import { UserDTO } from "@shared/dtos/user.dto";

export interface IRegisterUseCase{
    execute(user:UserDTO) : Promise<void>
}

