import { IServiceEntity } from "@entities/models/service.entity";


export interface IAddServiceUseCase {
    execute(vendorId:string,data:IServiceEntity) : Promise<void>
}