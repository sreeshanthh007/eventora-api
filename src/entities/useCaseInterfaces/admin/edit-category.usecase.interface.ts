import { ICategoryEnity } from "@entities/models/category.entity";


export interface IEditCategoryUseCase {
    execute(categoryId:string,data:Partial<ICategoryEnity>) : Promise<void>
}