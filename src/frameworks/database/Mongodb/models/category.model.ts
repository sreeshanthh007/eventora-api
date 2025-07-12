import { Document , model, Model ,  ObjectId} from "mongoose";
import { ICategoryEnity } from "@entities/models/category.entity";

export interface ICategoryModel extends Omit<ICategoryEnity,"_id">,Document{
    _id:ObjectId
}

export const categoryModel = model<ICategoryModel>("Category",)