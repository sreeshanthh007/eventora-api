import { IForgotPasswordController } from "@entities/controllerInterfaces/auth/forgotPassword-controller.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { ForgotVendorUpdatePasswordUseCase } from "@usecases/vendor/forgotPasswordVendorUseCase";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";



@injectable()
export class VendorForgotPassword implements IForgotPasswordController{
    constructor(
        @inject("ForgotVendorUpdatePasswordUseCase") private vendorUseCase : ForgotVendorUpdatePasswordUseCase
    ){}



    async handle(req: Request, res: Response): Promise<void> {
        const {email,password} = req.body
      
        
            await this.vendorUseCase.update(email,password)

        res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS});
        
    
         res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message:ERROR_MESSAGES.SERVER_ERROR})
    }
}