import { IWorkSampleEntity } from "@entities/models/work-sample.entity";
import { Document,  model,  ObjectId } from "mongoose";
import { workSampleschema } from "../schemas/workSample.schema";



export interface IWorkSampleModel extends Omit<IWorkSampleEntity,"_id">,Document{
    _id:ObjectId
}


export const workSampleModel =  model<IWorkSampleModel>("WorkSample",workSampleschema)