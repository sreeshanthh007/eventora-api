import { Schema,  } from "mongoose";
import { IAdminModel } from "../models/admin.model";


export const  adminSchema = new Schema<IAdminModel>(
    {
        email:{type:String,required:true,unique:true},

        password:{type:String},

        role:{type:String,default:"admin"}
    },

    {
        timestamps:true
    }
)
