import { IVendorController } from "@entities/controllerInterfaces/vendor/vendor-controller.interface";
import { IUpdateVendorPersonalInformationUseCase } from "@entities/useCaseInterfaces/vendor/update-vendor-personal.usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { updateVendorProfileSchema } from "interfaceAdpaters/validations/vendor.validation";
import { inject, injectable } from "tsyringe";







@injectable()
export class VendorController implements IVendorController{
    constructor(
        @inject("IUpdateVendorPersonalInformationUseCase") private _updateVendorPersonalInformation : IUpdateVendorPersonalInformationUseCase
    ){}

    async updatePersonalInformation(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        const data = req.body

        const validatedData = updateVendorProfileSchema.parse(data)

        await this._updateVendorPersonalInformation.execute(id,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})

    }

    async getAllNotifications(req: Request, res: Response): Promise<void> {
        

    }
}