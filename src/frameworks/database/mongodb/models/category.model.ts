import { Document , model, ObjectId} from "mongoose";
import { ICategoryEnity } from "@entities/models/category.entity";
import { CategorySchema } from "../schemas/category.schema";

export interface ICategoryModel extends Omit<ICategoryEnity,"_id">,Document{
    _id:ObjectId
}

export const categoryModel = model<ICategoryModel>("Category",CategorySchema)