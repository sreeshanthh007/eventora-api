import { IServiceEntity } from "@entities/models/service.entity";
import { ICreateServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/add-service.usecase";
import { inject, injectable } from "tsyringe";



@injectable()

export class CreateServiceUseCase implements ICreateServiceUseCase{
    constructor(
        // @inject("IServiceRepository")
    ){}


    async execute(data: IServiceEntity): Promise<void> {
       
    }
}