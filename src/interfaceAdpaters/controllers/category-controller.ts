import { ICategoryController } from "@entities/controllerInterfaces/category/category.interface";
import { ICategoryEnity } from "@entities/models/category.entity";
import { IAddCategoryUseCase } from "@entities/useCaseInterfaces/admin/add-category.usecase";
import { IGetAllCatgoryUseCase } from "@entities/useCaseInterfaces/admin/get-all-category.usecase";
import { IHandleToggleCategoryUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle-category.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";




@injectable()
export class CategoryController  implements ICategoryController{
    constructor(
        @inject("IAddCategoryUseCase") private _addCategoryUseCase : IAddCategoryUseCase,
        @inject("IGetAllCategoryUseCase") private _getAllCategoryUseCase : IGetAllCatgoryUseCase,
        @inject("IHandleToggleCategoryUseCase") private _toggleCategoryUseCase : IHandleToggleCategoryUseCase,
    ){}

    async addCategory(req: Request, res: Response): Promise<void> {
        const {title,image} = req.body

        if(!title || !image){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        await this._addCategoryUseCase.execute(title,image)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.CREATED})
    }


    async getAllCategory(req: Request, res: Response): Promise<void> {
        
        const {
            limit="10",
            page="1",
            search=""
        }  = req.query  as {
            limit?:string,
            page?:string,
            search?:string
        };


        const response = await this._getAllCategoryUseCase.execute(Number(limit),search,Number(page))

        res.status(HTTP_STATUS.OK)
        .json({
        success:true,
        message:"categpry fetched successfully",
        category:response.categories,
        totalPages:response.total
        });
    }


    async toogleCategory(req: Request, res: Response): Promise<void> {
        
        const {categoryId,status} = req.body
        console.log("id and stats",categoryId,status)
        
        if(!categoryId || !status){
             throw new CustomError(
             ERROR_MESSAGES.ID_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND
            )
        }


        if(!["active","blocked"].includes(status)){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:"status must be active or blocked"})
            return
        }

        await this._toggleCategoryUseCase.execute(categoryId)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})
    }

    async editCategory(req: Request, res: Response): Promise<void> {

        const data :Partial<ICategoryEnity> = req.body

        if(!data){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

    }
} 