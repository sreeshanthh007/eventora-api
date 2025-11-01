import { IRRuleServiceEntity } from "@entities/models/rrule.service.entity";
import { model, ObjectId } from "mongoose";
import { rruleServiceSchema } from "../schemas/rrule.service.schema";


export interface IRRuleServiceModel extends Omit<IRRuleServiceEntity,"_id">,Document{
    _id:ObjectId
}

export const rruleServiceModel = model<IRRuleServiceModel>("RRuleservice",rruleServiceSchema)