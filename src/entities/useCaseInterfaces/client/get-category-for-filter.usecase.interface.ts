import { ICategoryForFilterDTO } from "@shared/dtos/category.dto";


export interface IGetCategoryForFilterUseCase{
    execute() : Promise<ICategoryForFilterDTO[]>
}