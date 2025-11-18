import { CategoryDTO } from "@shared/dtos/user.dto";


export interface PaginatedCategory {
    categories:CategoryDTO[] | [],
    total:number    
}