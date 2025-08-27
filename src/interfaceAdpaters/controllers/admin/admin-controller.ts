import { IAdminController } from "@entities/controllerInterfaces/admin/admin.controller.interface";
import { IEditCategoryUseCase } from "@entities/useCaseInterfaces/admin/edit-category.usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { categorySchema } from "interfaceAdpaters/validations/category-validation";
import { inject, injectable } from "tsyringe";




@injectable()
export class AdminController implements IAdminController{
    constructor(
        @inject("IEditCategoryUseCase") private _editCategoryUseCase : IEditCategoryUseCase
    ){}

    async editCategory(req: Request, res: Response): Promise<void> {
          
        const {categoryId} = req.params
 
        const data = req.body

        const validatedData = categorySchema.parse(data)

        await this._editCategoryUseCase.execute(categoryId,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})
    }
}