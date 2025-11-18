import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IGetAllCategoryForServiceUseCase } from "@entities/useCaseInterfaces/get-category-for-service.interface.usecase";
import { mapCategoriesForFrontend } from "@mappers/CategoryMapper";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetCategoriesForServiceUseCase implements IGetAllCategoryForServiceUseCase{
    constructor(
        @inject("ICategoryRepository") private _categoryRepo :  ICategoryRepository
    ){}

    async execute():  Promise<{ categoryId: string; title: string }[]> {
        
        const categories = await this._categoryRepo.findCategoryForClients()

        return mapCategoriesForFrontend(categories)

    }
}