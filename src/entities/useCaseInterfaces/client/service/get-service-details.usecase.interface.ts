import { ServiceDTO } from "@shared/dtos/service.dto";


export interface IGetAllServiceDetailsUseCase {
    execute(serviceId:string) : Promise<ServiceDTO |  null>
}