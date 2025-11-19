
import { ICategoryEnity } from "@entities/models/category.entity";
import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { categoryModel } from "@frameworks/database/mongodb/models/category.model";
import { FilterQuery } from "mongoose";
import { injectable } from "tsyringe";

@injectable()
export class CategoryRepository implements ICategoryRepository{
   async findByTitle(title: string): Promise<ICategoryEnity | null> {
       return await categoryModel.findOne({title})
   }

   async findById(id: string): Promise<ICategoryEnity | null> {
       return await categoryModel.findById(id)
   }

   async findByIDAndUpdateStatus(id: string, status: string): Promise<void> {
        await categoryModel.findByIdAndUpdate(id,
        {$set:{status:status}}
       )
   }
   async save(category:ICategoryEnity) : Promise<ICategoryEnity >{
    return await categoryModel.create(category)
   }

    async findPaginatedCategory(filter:FilterQuery<ICategoryEnity>,skip:number,limit:number) : Promise<{categories:ICategoryEnity[] | []; total:number}>{
        const [categories,total] = await Promise.all([
            categoryModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
            categoryModel.countDocuments(filter),
        ]);

        return {
            categories,
            total
        }
    }

    async findByIdAndEditCategory(categoryId: string, data: Partial<ICategoryEnity>): Promise<void> {
        await categoryModel.findByIdAndUpdate(categoryId,data,
            {
                new:true
            }
        )
    }

    async findCategoryForClients(): Promise<ICategoryEnity[]> {
        return await categoryModel.find({status:"active"})
    }

    async findCategoryForFilter(): Promise<ICategoryEnity[]> {
        return await categoryModel.find()
    }
}