import { IServiceEntity } from "@entities/models/service.entity";


export interface ICreateServiceUseCase {
    execute(data:IServiceEntity) : Promise<void>
}