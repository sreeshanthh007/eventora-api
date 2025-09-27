;
import { TRole } from "@shared/constants";
import { ClientResponseDTO, VendorResponseDTO } from "@shared/dtos/user.dto";


export interface IGetAllUsersDetailsUseCase{
    execute(userId:string,role:TRole) : Promise<ClientResponseDTO | VendorResponseDTO>
}