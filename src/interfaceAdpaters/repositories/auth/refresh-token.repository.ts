// import { ObjectId } from "mongoose";
// import { IRefreshTokenRepository } from "@entities/repositoryInterfaces/auth/refresh-token-repository.interface";

// import { RedisClient } from "@frameworks/cache/redis.client";


// export class refreshTokenRepository implements IRefreshTokenRepository {
//     async save(data: { token: string; userType: string; user: ObjectId; expiresAt: Date; }): Promise<void> {

//         const ttl = Math.floor((data.expiresAt.getTime() - Date.now())/1000);


//         await RedisClient.hSet(`refresh:${data.token}`,{
//             userType:data.userType,
//             user:data.user.toString()
//         });

//         await RedisClient.expire(`refresh:${data.token}`,ttl)

//     }


//     async revokeRefreshToken(token: string): Promise<void> {
//        await RedisClient.del(`refresh:${token}`)

      

//     }
// }