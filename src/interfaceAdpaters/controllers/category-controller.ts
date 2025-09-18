import { ICategoryController } from "@entities/controllerInterfaces/category/category.interface";
import { IAddCategoryUseCase } from "@entities/useCaseInterfaces/admin/add-category.usecase.interface";
import { IGetAllCatgoryUseCase } from "@entities/useCaseInterfaces/admin/get-all-category.usecase.interface";
import { IHandleToggleCategoryUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle-category.usecase.interface";
import { IGetAllCategoryForServiceUseCase } from "@entities/useCaseInterfaces/get-category-for-service.interface.usecase";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";




@injectable()
export class CategoryController  implements ICategoryController{
    constructor(
        @inject("IAddCategoryUseCase") private _addCategoryUseCase : IAddCategoryUseCase,
        @inject("IGetAllCategoryUseCase") private _getAllCategoryUseCase : IGetAllCatgoryUseCase,
        @inject("IHandleToggleCategoryUseCase") private _toggleCategoryUseCase : IHandleToggleCategoryUseCase,
        @inject("IGetCategoriesForServiceUseCase") private _getCategoryForServiceUseCase : IGetAllCategoryForServiceUseCase,
    ){}

    async addCategory(req: Request, res: Response): Promise<void> {
        const {title,image} = req.body

        if(!title || !image){
            res.status(HTTP_STATUS.BAD_REQUEST)
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
        message:SUCCESS_MESSAGES.CATEGORY_FETCHED_SUCCESS,
        category:response.categories,
        totalPages:response.total
        });
    }


    async getCategoryForService(req: Request, res: Response): Promise<void> {
        
        const categories = await this._getCategoryForServiceUseCase.execute()

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.CATEGORY_FETCHED_SUCCESS,data:categories})

    }


    async toogleCategory(req: Request, res: Response): Promise<void> {
        
        const {categoryId,status} = req.body
        
        
        if(!categoryId || !status){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
            return
        }


        if(!["active","blocked"].includes(status)){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.INVALID_STATUS})
            return
        }

        await this._toggleCategoryUseCase.execute(categoryId)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})
    }
} 