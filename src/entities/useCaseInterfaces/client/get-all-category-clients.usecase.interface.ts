import { CategoryDTO } from "@shared/dtos/user.dto";


export interface IGetAllCategoryForClientsUseCase {
    execute() : Promise<CategoryDTO[]>
}