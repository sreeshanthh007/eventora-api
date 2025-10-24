import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IGetCategoryForFilterUseCase } from "@entities/useCaseInterfaces/client/get-category-for-filter.usecase.interface";
import { mapCategoriesForFilter } from "@mappers/CategoryMapper";
import { ICategoryForFilterDTO } from "@shared/dtos/category.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetCategoryForFilterUseCase implements IGetCategoryForFilterUseCase{

    constructor(
        @inject("ICategoryRepository") private _categoryRepo : ICategoryRepository
    ){}


    async execute(): Promise<ICategoryForFilterDTO[]> {
        
        const categories = await this._categoryRepo.findCategoryForFilter()


        const mappedCategories = mapCategoriesForFilter(categories);
        return mappedCategories
    }
}