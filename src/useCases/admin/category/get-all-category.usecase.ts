
import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IGetAllCatgoryUseCase } from "@entities/useCaseInterfaces/admin/get-all-category.usecase.interface";
import { toCategoryListResponse } from "@mappers/CategoryMapper";
import { PAGINATION } from "@shared/constants";
import { PaginatedCategory } from "interfaceAdapters/models/paginatedCategory";

import { inject, injectable } from "tsyringe";




@injectable()
export class GetAllCategoryUseCase implements IGetAllCatgoryUseCase{
    constructor(
        @inject("ICategoryRepository") private categoryRepo :ICategoryRepository
    ){}

   async execute(limit: number, searchTerm: string, current: number): Promise<PaginatedCategory> {
   
     
     const safePage = Math.max(
       PAGINATION.PAGE,
       current || PAGINATION.PAGE
     )
     
     const safeLimit = Math.min(
       PAGINATION.MAX_LIMIT,
       Math.max(1, limit || PAGINATION.LIMIT)
     );
     
   
    const skip = (safePage - 1) * safeLimit;

    const { categories, total } = await this.categoryRepo.findPaginatedCategory(searchTerm, skip, limit);

    const response = {
        categories: toCategoryListResponse(categories),
        total : Math.ceil(total / limit),
    };

    return response;
}
}