
import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";
import { IAddCategoryUseCase } from "@entities/useCaseInterfaces/admin/add-category.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";;
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddCategoryUseCase implements IAddCategoryUseCase{
    constructor(
        @inject("ICategoryRepository") private categoryRepo : ICategoryRepository,
        @inject("IUUIDGeneratorService") private _generateUUID : IUUIDGeneratorService
    ){}
    async execute(title: string, image: string): Promise<void> {
        
        const isCategoryExist = await this.categoryRepo.findByTitle(title)

        if(isCategoryExist){
            throw new CustomError(ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS,HTTP_STATUS.CONFLICT)
        }

        const categoryId = this._generateUUID.generate()

            const categoryData = {
                 categoryId,
                    title,
                    image,
                 status: "active", 
            };

            await this.categoryRepo.save(categoryData)
    }
}