import { IClientController } from "@entities/controllerInterfaces/client/client-controller.interface";
import { IUpdateProfileImageUseCase } from "@entities/useCaseInterfaces/client/updateProfileImage.usecase.interface";
import { IGetAllUsersDetailsUseCase } from "@entities/useCaseInterfaces/get-all-users.interface.usecase";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES, TRole } from "@shared/constants";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { updateProfileImageSchema } from "interfaceAdpaters/validations/client-validation";
import { inject, injectable } from "tsyringe";



@injectable()
export class ClientController implements IClientController{
    
    constructor(
        @inject("IGetAllUsersDetailsUseCase") private _getAllUsersDetailsUseCase : IGetAllUsersDetailsUseCase,
        @inject("IUpdateProfileImageUseCase") private _updateProfileImageUseCase : IUpdateProfileImageUseCase
    ){}

    async refreshSession(req: Request, res: Response): Promise<void> {
        
        const {id,role} = (req as CustomRequest).user

        if(!id || !role){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.INVALID_TOKEN})
        }

        const user = await this._getAllUsersDetailsUseCase.execute(id,role as TRole)

        res.status(HTTP_STATUS.OK)
        .json({success:true,user:user})
    }



    async updateProfileImage(req: Request, res: Response): Promise<void> {
        const {image}   = req.body 
  
        const {id,role} = (req as CustomRequest).user

        if(!id || !role){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.INVALID_TOKEN})
        }

        await this._updateProfileImageUseCase.execute(id,image,role as TRole)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})
    }
}