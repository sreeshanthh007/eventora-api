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
        try {
             const {
            limit = "10",
            currentPage = "1",
            searchTerm = ""
            } = req.query as {
            limit?: string
            currentPage?: string
            searchTerm?: string
            }

            const response = await this.getAllVendors.execute(Number(limit),searchTerm,Number(currentPage))
            
            res.status(HTTP_STATUS.OK).json({success:true,message:"Vendor fetched successfullly",vendors:response.user,totalPages:response.total})
        } catch (error) {
            console.log(error)
        }
    }
}