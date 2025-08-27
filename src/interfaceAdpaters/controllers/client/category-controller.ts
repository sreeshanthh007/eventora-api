import { IFetchCategoryController } from "@entities/controllerInterfaces/client/get-all-categories.interface";
import { IGetAllCategoryForClientsUseCase } from "@entities/useCaseInterfaces/client/get-all-category.usecase";
import { HTTP_STATUS } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class FetchCategoryController implements IFetchCategoryController{
    constructor(
        @inject("IGetAllCategoryForClientsUseCase") private getAllCategoryUseCase : IGetAllCategoryForClientsUseCase
    ){}

    async getAllCategories(req: Request, res: Response): Promise<void> {
        
        const categories = await this.getAllCategoryUseCase.execute()

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:"categories fetched successfully",categories:categories})
    }
}