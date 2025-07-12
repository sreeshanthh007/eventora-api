import { model  } from "mongoose";
import { ClientSchema } from "../schemas/client.schema";
import { IRefreshTokenEntity } from "@entities/models/refresh-token.entity";
import { RefreshTokenSchema } from "../schemas/refresh-token.schema";

export interface IRefreshTokenModel extends IRefreshTokenEntity,Document {}

export const RefreshTokenModel  = model<IRefreshTokenModel>(
    "RefreshToken",
    RefreshTokenSchema
)