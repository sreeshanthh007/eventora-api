
import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";



export interface ILoginUserCase {
    execute(user:LoginUserDTO) : Promise<LoginResponseDTO>
}