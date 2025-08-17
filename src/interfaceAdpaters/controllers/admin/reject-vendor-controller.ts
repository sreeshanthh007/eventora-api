import { IRejectVendorController } from "@entities/controllerInterfaces/admin/reject-vendor-interface";
import { IRejectVendorUseCase } from "@entities/useCaseInterfaces/admin/reject-vendor.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";


@injectable()

export class RejectVendorController implements IRejectVendorController{
    constructor(
        @inject("IRejectVendorUseCase") private rejectVendor : IRejectVendorUseCase
    ){}

    async handle(req: Request, res: Response): Promise<void> {
            const {vendorId} = req.body

            if(!vendorId){
                throw new CustomError(ERROR_MESSAGES.ID_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }

            const response = await this.rejectVendor.execute(vendorId)

            res.status(HTTP_STATUS.OK).json({success:true,message:"rejected successfully"})
    }
}