import { inject , injectable } from "tsyringe";
import { IForgotUpdatePasswordUseCase } from "@entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
import { IForgotPasswordController } from "@entities/controllerInterfaces/auth/forgotPassword-controller.interface";
import { Request, Response } from "express";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";

    @injectable()
    export class ForgotPasswordController implements IForgotPasswordController{
        constructor(
            @inject("IForgotClientUpdatePasswordUseCase") private forgotUpdatePassword : IForgotUpdatePasswordUseCase
        ){}


        async handle(req: Request, res: Response): Promise<void> {
            try {
                const {email,password} = req.body
                
                await this.forgotUpdatePassword.update(email,password)

                 res.status(HTTP_STATUS.OK).json({
                 message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                })

            } catch (error) {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message:ERROR_MESSAGES.SERVER_ERROR})
            }
        }
    }