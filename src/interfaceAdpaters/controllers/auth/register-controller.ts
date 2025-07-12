import { inject , injectable } from "tsyringe";
import { Request , Response } from "express";
import { UserDTO } from "@shared/dtos/user.dto";
import { userSchema } from "./validations/user-signup-validation.schema";
import { IRegisterUseCase } from "@entities/useCaseInterfaces/auth/register-usecase.interface";
import { IRegisterController } from "@entities/controllerInterfaces/auth/register-controller.interface";

import { HTTP_STATUS , SUCCESS_MESSAGES , ERROR_MESSAGES } from "@shared/constants";


@injectable()
export class registerUserController implements IRegisterController {
    constructor(
        @inject("IRegisterUseCase")
        private registerUserCases : IRegisterUseCase
    ){}


    async handle(req: Request, res: Response): Promise<void> {
        
        const {role} = req.body as UserDTO
      
        const schema = userSchema[role]
       
        if(!schema){
             res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message:ERROR_MESSAGES.INVALID_CREDENTIALS})
            return
        }

        const validateData = schema.parse(req.body)
        
        await this.registerUserCases.execute(validateData)

        res.status(HTTP_STATUS.CREATED).json({
            success:true,
            message:SUCCESS_MESSAGES.REGISTERATION_SUCCESS,
        });

    }
}