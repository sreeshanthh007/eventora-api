import { Schema } from "mongoose";
import { ROLES } from "../../../../shared/constants";
import { IClientModel } from "../models/client.model";

export const ClientSchema = new Schema<IClientModel>(
    {
        clientId:{type:String,required:true},

        name:{type:String,required:true},

        phone:{type:String},

        email:{type:String,required:true,unique:true},
        
        password:{type:String},

        role:{type:String,enum:ROLES,required:true},

        profileImage:{type:String},

        googleId:{type:String},

        status:{type:String,default:"active"},

        fcmToken:{type:String}
    },

    {
     timestamps:true,   
    },
);


ClientSchema.index({status:1})