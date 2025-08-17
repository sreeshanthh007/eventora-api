import { IApproveVendorController } from "@entities/controllerInterfaces/admin/approve-vendor.interface";
import { IApproveVendorUseCase } from "@entities/useCaseInterfaces/admin/approve-vendor.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";



@injectable()
export class ApproveVendorController implements IApproveVendorController{
    constructor(
        @inject("IApproveVendorUseCase") private approveVendor : IApproveVendorUseCase
    ){}
    async handle(req: Request, res: Response): Promise<void> {
        
        const {vendorId} = req.body

        if(!vendorId){
            throw new CustomError(ERROR_MESSAGES.ID_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const response = await this.approveVendor.execute(vendorId)

        res.status(HTTP_STATUS.OK).json({
            success:true,
            message:SUCCESS_MESSAGES.UPDATE_SUCCESS
        });
    }
}