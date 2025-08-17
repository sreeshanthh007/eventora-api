import { IGetAllVendorsController } from "@entities/controllerInterfaces/admin/get-all-vendors.interface";
import { IGetAllVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-all-vendors.usecase";
import { HTTP_STATUS } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllVendorsController implements IGetAllVendorsController {
    constructor(
        @inject("IGetAllVendorsUseCase") private getAllVendors : IGetAllVendorsUseCase
    ){}

    async handle(req: Request, res: Response): Promise<void> {
   
             const {
            limit = "10",
            page = "1",
            search = ""
            } = req.query as {
            limit?: string
            page?: string
            search?: string
            }

            const response = await this.getAllVendors.execute(Number(limit),search,Number(page))
            
            res.status(HTTP_STATUS.OK).json({success:true,message:"Vendor fetched successfullly",vendors:response.user,totalPages:response.total})
    }
}