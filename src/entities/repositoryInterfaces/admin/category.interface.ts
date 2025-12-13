import { ICategoryEnity } from "@entities/models/category.entity";

export interface ICategoryRepository {
    findByTitle(title:string) : Promise<ICategoryEnity | null>
    findById(id:string) : Promise<ICategoryEnity | null>
    findByIDAndUpdateStatus(id:string,status:string) : Promise<void>
    save(category:ICategoryEnity) : Promise<ICategoryEnity>
    findByIdAndEditCategory(categoryId:string,data:Partial<ICategoryEnity>) : Promise<void>
    findPaginatedCategory(search:string,skip:number,limit:number) :  Promise<{categories:ICategoryEnity[] | [];total:number}>
    findCategoryForClients() : Promise<ICategoryEnity[]>
    findCategoryForFilter() : Promise<ICategoryEnity[]>
}

