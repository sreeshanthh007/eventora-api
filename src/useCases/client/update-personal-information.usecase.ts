
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IUpdatePersonalInformationUseCase } from "@entities/useCaseInterfaces/client/update-personal-information.interface.usecase";
import { UpdateClientDTO } from "@shared/dtos/user.dto";
import { inject, injectable } from "tsyringe";




@injectable()
export class ClientUpdatePersonalInformationUseCase implements IUpdatePersonalInformationUseCase{
    constructor(
        @inject("IClientRepository") private _clientRepo : IClientRepository
    ){}

    async execute(userId: string, updateData: UpdateClientDTO): Promise<void> {
        await this._clientRepo.findByIdAndUpdateProfileInformation(userId,updateData)
    }

}