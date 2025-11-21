import { ICategoryModel } from "../models/category.model";
import { Schema } from "mongoose";

    export const CategorySchema = new Schema<ICategoryModel>(
        {
            categoryId:{type:String,required:true,unique:true},
            
            status:{type:String,default:"active"},

            title:{type:String,required:true},

            image:{type:String,required:true}
        },
        {
            timestamps:true
        }
    )


CategorySchema.index({status:1})