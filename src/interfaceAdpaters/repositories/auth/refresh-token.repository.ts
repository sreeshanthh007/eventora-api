import { ObjectId } from "mongoose";
import { IRefreshTokenRepository } from "@entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { RefreshTokenModel } from "@frameworks/database/Mongodb/models/refresh-token.model";


export class refreshTokenRepository implements IRefreshTokenRepository {
    async save(data: { token: string; userType: string; user: ObjectId; expiresAt: Date; }): Promise<void> {
        await RefreshTokenModel.create({
            token:data.token,
            userType:data.userType,
            user:data.user,
            expiresAt:data.expiresAt
        });
    }


    async revokeRefreshToken(token: string): Promise<void> {
        await RefreshTokenModel.deleteOne({token})
    }
}