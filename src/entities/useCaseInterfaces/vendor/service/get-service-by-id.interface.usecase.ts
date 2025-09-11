import { IServiceEntity } from "@entities/models/service.entity";


export interface IGetServiceByIdUseCase{
    execute(serviceId:string) : Promise<IServiceEntity | null>
}