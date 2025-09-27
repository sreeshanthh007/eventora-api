
import { IServiceResponse } from "@mappers/serviceMapper";



export interface IGetServiceByIdUseCase{
    execute(serviceId:string) : Promise<IServiceResponse | null>
}