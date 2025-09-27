
import { CreateServiceDTO } from "@shared/dtos/service.dto";


export interface IAddServiceUseCase {
    execute(vendorId:string,data:CreateServiceDTO) : Promise<void>
}