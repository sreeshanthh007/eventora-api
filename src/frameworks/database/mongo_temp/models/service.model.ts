import { IServiceEntity } from "@entities/models/service.entity";
import { Document , ObjectId , model } from "mongoose";
import { ServiceSchema } from "../schemas/service.schema";

export interface IServiceModel extends Omit<IServiceEntity,"_id">,Document {
    _id:ObjectId,
}

export const serviceModel =  model<IServiceModel>("service",ServiceSchema)