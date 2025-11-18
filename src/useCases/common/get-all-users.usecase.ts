import { IClientEntity } from "@entities/models/client.entity";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllUsersDetailsUseCase } from "@entities/useCaseInterfaces/get-all-users.interface.usecase";
import { CustomError } from "@entities/utils/custom.error";


import { mapClientToDTO } from "@mappers/ClientMapper";
import { mapVendorToDTO } from "@mappers/VendorMapper";
import { ERROR_MESSAGES, HTTP_STATUS, TRole } from "@shared/constants";
import { ClientResponseDTO, VendorResponseDTO } from "@shared/dtos/user.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetAllUsersDetailsUseCase implements IGetAllUsersDetailsUseCase{
    constructor(
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository,
        @inject("IClientRepository") private _clientRepo : IClientRepository
    ){}

    async execute(userId: string, role: TRole): Promise<ClientResponseDTO | VendorResponseDTO> {
           let repository  = null

        if(role=="client"){
            repository  = this._clientRepo
        }else if(role=="vendor"){
            repository = this._vendorRepo
        }else{
            throw new CustomError(
                ERROR_MESSAGES.INVALID_ROLE,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const user = await repository.findById(userId)

        if(!user){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

         return role === "client"
        ? mapClientToDTO(user as IClientEntity)
        : mapVendorToDTO(user as IVendorEntity); 
}
}