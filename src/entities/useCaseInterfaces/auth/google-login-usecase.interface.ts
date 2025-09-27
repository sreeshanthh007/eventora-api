
import { TRole } from "@shared/constants";
import { UserResponseDTO } from "@shared/dtos/user.dto";



export interface IGoogleUseCase{
    execute(
        credential:string,
        client_id:string,
        role:TRole
    ) : Promise<UserResponseDTO>
}