
import { UpdateClientDTO } from "@shared/dtos/user.dto";


export interface IUpdatePersonalInformationUseCase {
     execute(userId:string,updateData:UpdateClientDTO) : Promise<void>
}

