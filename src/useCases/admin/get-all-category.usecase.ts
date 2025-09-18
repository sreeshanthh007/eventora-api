import { ICategoryEnity } from "@entities/models/category.entity";
import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IGetAllCatgoryUseCase } from "@entities/useCaseInterfaces/admin/get-all-category.usecase.interface";
import { toCategoryListResponse } from "interfaceAdpaters/mappers/CategoryMapper";
import { PaginatedCategory } from "interfaceAdpaters/models/paginatedCategory";
import { FilterQuery } from "mongoose";
import { inject, injectable } from "tsyringe";




@injectable()
export class GetAllCategoryUseCase implements IGetAllCatgoryUseCase{
    constructor(
        @inject("ICategoryRepository") private categoryRepo :ICategoryRepository
    ){}

   async execute(limit: number, searchTerm: string, current: number): Promise<PaginatedCategory> {
    const filter: FilterQuery<ICategoryEnity> = {};

    if (searchTerm) {
        filter.$or = [
            { title: { $regex: searchTerm, $options: "i" } },
            { categoryId: { $regex: searchTerm, $options: "i" } }
        ];
    }

    const validPageNumber = Math.max(1, current || 1);
    const skip = (validPageNumber - 1) * limit;

    const { categories, total } = await this.categoryRepo.findPaginatedCategory(filter, skip, limit);

    const response = {
        categories: toCategoryListResponse(categories),
        total : Math.ceil(total / limit),
    };

    return response;
}
}