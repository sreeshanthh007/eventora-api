
// import { IUserEntity } from "@entities/models/user.entity";

import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";


export interface ILoginStrategy {
    login(user:LoginUserDTO) : Promise<LoginResponseDTO>
}