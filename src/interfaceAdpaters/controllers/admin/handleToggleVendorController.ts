

import { IToggleVendorStatus } from "@entities/controllerInterfaces/admin/handle-toggle.vendor.interface";
import { IHandleToggleVendorUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle.vendor.usecase";
import { HTTP_STATUS } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class HandleToggleVendorStatus implements IToggleVendorStatus {
    constructor(
        @inject("IHandleToggleVendorUseCase") private vendorUseCase : IHandleToggleVendorUseCase
    ){}

    async handle(req: Request, res: Response): Promise<void> {
        const {vendorId,status} = req.body as {vendorId:string,status:string}

         if (!vendorId || !status) {
           res.status(HTTP_STATUS.BAD_REQUEST).json({
             success: false,
             message: "userId and status are required",
           });
           return;
         }

          if (!['active', 'blocked'].includes(status)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Status must be either 'active' or 'blocked'"
                });
                return;
            }

            await this.vendorUseCase.execute(vendorId,status)


    }
}