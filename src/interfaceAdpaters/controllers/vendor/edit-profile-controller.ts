import { IEditVendorProfileController } from "@entities/controllerInterfaces/vendor/edit-profile.interface";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { IEditVendorProfileUseCase } from "@entities/useCaseInterfaces/vendor/edit-profile.usecase.interface";
import { HTTP_STATUS } from "@shared/constants";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";




@injectable()
export class EditVendorProfileController implements IEditVendorProfileController{
    constructor(
        @inject("IEditVendorProfileUseCase") private vendorEditProfile : IEditVendorProfileUseCase
    ){}


    async handle(req: Request, res: Response): Promise<void> {
        const cliendId = (req as CustomRequest).user.id

        const updateData : Partial<IVendorEntity> = {}

         const allowedFields: (keyof IVendorEntity)[] = [
                    "name",
                    "phone",
                    "about",
                "profileImage",
                    "place"
             ];

             allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
             updateData[field] = req.body[field];
            }
        });

        await this.vendorEditProfile.execute(cliendId,updateData)

        res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"details updated successfully"
        })

    }
}