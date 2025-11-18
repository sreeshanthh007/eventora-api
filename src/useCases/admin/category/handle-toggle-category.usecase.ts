import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { IHandleToggleCategoryUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle-category.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class HandleToggleCategoryUseCase implements IHandleToggleCategoryUseCase{
    constructor(
        @inject("ICategoryRepository") private categoryRepo : ICategoryRepository
    ){}


    async execute(categoryId: string): Promise<void> {
        
        const categoryExist = await this.categoryRepo.findById(categoryId)

        if(!categoryExist){
            throw new CustomError(
                "category didnt exist",
                HTTP_STATUS.NOT_FOUND
            )
        }


        const status = categoryExist.status === "active" ? "blocked" : "active"

        await this.categoryRepo.findByIDAndUpdateStatus(categoryId,status)



    }
}