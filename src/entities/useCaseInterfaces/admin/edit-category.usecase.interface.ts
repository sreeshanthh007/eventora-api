import { EditCategoryDTO } from "@shared/dtos/category.dto";


export interface IEditCategoryUseCase {
    execute(categoryId:string,data:EditCategoryDTO) : Promise<void>
}