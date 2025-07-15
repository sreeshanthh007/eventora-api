
import { ObjectId } from "mongoose";
import { TRole } from "@shared/constants";

export interface IRefreshTokenRepository {
    save(data:{
    token:string,
    userType:string,
    user:ObjectId,
    expiresAt:Date
    }):Promise<void>

    revokeRefreshToken(token:string):Promise<void>
}