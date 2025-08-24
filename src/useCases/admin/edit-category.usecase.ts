import { ICategoryEnity } from "@entities/models/category.entity";
import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IEditCategoryUseCase } from "@entities/useCaseInterfaces/admin/edit-category.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";




@injectable()
export class EditCategoryUseCase implements IEditCategoryUseCase{
    constructor(
        @inject("ICategoryRepository") private _categoryRepo : ICategoryRepository
    ){}

    async execute(categoryId: string, data: Partial<ICategoryEnity>): Promise<void> {
        
        const categoryExist = await this._categoryRepo.findById(categoryId)

        if(!categoryExist){
            throw new CustomError("category not found",HTTP_STATUS.NOT_FOUND)
        }
        await this._categoryRepo.findByIdAndEditCategory(categoryId,data)
    }
}