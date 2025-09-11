import { IClientEntity } from "@entities/models/client.entity";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IUpdatePersonalInformationUseCase } from "@entities/useCaseInterfaces/client/update-personal-information.interface.usecase";
import { inject, injectable } from "tsyringe";




@injectable()
export class ClientUpdatePersonalInformationUseCase implements IUpdatePersonalInformationUseCase{
    constructor(
        @inject("IClientRepository") private _clientRepo : IClientRepository
    ){}

    async execute(userId: string, updateData: Partial<IClientEntity>): Promise<void> {
        
        await this._clientRepo.findByIdAndUpdateProfileInformation(userId,updateData)
    }

}