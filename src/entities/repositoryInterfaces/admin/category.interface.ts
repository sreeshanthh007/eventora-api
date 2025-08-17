import { ICategoryEnity } from "@entities/models/category.entity";
import { FilterQuery } from "mongoose";

export interface ICategoryRepository {
    findByTitle(title:string) : Promise<ICategoryEnity | null>
    findById(id:string) : Promise<ICategoryEnity | null>
    findByIDAndUpdateStatus(id:string,status:string) : Promise<void>
    save(category:ICategoryEnity) : Promise<ICategoryEnity>
    findPaginatedCategory(filter:FilterQuery<ICategoryEnity>,skip:number,limit:number) :  Promise<{categories:ICategoryEnity[] | [];total:number}>
    findCategoryForClients() : Promise<ICategoryEnity[]>
}

