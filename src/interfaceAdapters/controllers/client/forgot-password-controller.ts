import { inject , injectable } from "tsyringe";
import { IForgotUpdatePasswordUseCase } from "@entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
import { IForgotPasswordController } from "@entities/controllerInterfaces/auth/forgotPassword-controller.interface";
import { Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";

    @injectable()
    export class ForgotPasswordController implements IForgotPasswordController{
        constructor(
            @inject("IForgotUpdatePasswordUseCase") private forgotUpdatePasswordUseCase : IForgotUpdatePasswordUseCase
        ){}


        async handle(req: Request, res: Response): Promise<void> {
         
                const {email,password,role} = req.body
              if(!email || !password || !role){
                res.status(HTTP_STATUS.BAD_REQUEST)
                .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
              }

                await this.forgotUpdatePasswordUseCase.update(email,password,role)

                 res.status(HTTP_STATUS.OK).json({
                 message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                })
        }
    }