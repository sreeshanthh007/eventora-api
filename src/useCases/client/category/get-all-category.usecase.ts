import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IGetAllCategoryForClientsUseCase } from "@entities/useCaseInterfaces/client/category/get-all-category-clients.usecase.interface";
import { CategoryDTO } from "@shared/dtos/user.dto";
import { toCategoryListResponse } from "@mappers/CategoryMapper";
import { inject, injectable } from "tsyringe";



@injectable()

export class GetAllCategoryForClientUseCase implements IGetAllCategoryForClientsUseCase{
    constructor(
        @inject("ICategoryRepository") private categoryRepo : ICategoryRepository
    ){}


    async execute(): Promise<CategoryDTO[]> {
       const allCategories =  await this.categoryRepo.findCategoryForClients()

       const mappedCategories  = toCategoryListResponse(allCategories)
       
       return mappedCategories
    }
}