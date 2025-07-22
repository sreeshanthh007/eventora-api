
// import { RedisClient } from "@frameworks/cache/redis.client";
// import { config } from "@shared/config";

// export const setOTP = async(key:string,otp:string,ttl=300)=>{
//       await RedisClient.set(
//     `${config.OTP_PREFIX}${key}`,
//     otp,
//     {
//       EX: ttl,
//     }
//   );
// }


// export const getOTP = async(key:string):Promise<string | null>=>{
//     return await RedisClient.get(`${config.OTP_PREFIX}${key}`);
// }


// export const deleteOTP = async(email:string):Promise<void>=>{
//     await RedisClient.del(email)
// }