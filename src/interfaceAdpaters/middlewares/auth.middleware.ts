import { Request , Response , NextFunction } from "express";
import { jwtService } from "interfaceAdpaters/services/jwtService";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES , HTTP_STATUS } from "@shared/constants";
import { RedisClient } from "@frameworks/cache/redis.client";

const tokenService = new jwtService()


export interface CustomJWTPayload extends JwtPayload {
    id:string,
    email:string,
    role:string,
    access_token:string,
    refresh_token:string
}


export interface CustomRequest extends Request{
    user:CustomJWTPayload
}

const extractToken = (req: Request): { access_token: string; refresh_token: string } | null => {

     const basePath = req.baseUrl.split("/");
  const userType = basePath[2]; 

  if (["client", "vendor", "admin"].includes(userType)) {
    return {
      access_token: req.cookies[`${userType}_access_token`] || null,
      refresh_token: req.cookies[`${userType}_refresh_token`] || null,
    };
  }

  return null;
};


const isBlacklisted = async(token:string) :Promise<boolean> =>{
    console.log("token in isblack",token);
    
    const result = await RedisClient.get(token)
    
    
    return result!==null
}


export const verifyAuth = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = extractToken(req)

       

     if (!token) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    if(await isBlacklisted(token.access_token)){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({message:"Token is Blacklisted"})
    }

    const user = tokenService.verifyAccessToken(token.access_token) as CustomJWTPayload

    if(!user || !user.id){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS})
    }

    (req as CustomRequest).user={
        ...user,
        access_token:token.access_token,
        refresh_token:token.refresh_token
    }

    next()


    } catch (error) {
     
    console.log("token is invalid is worked",error);
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    return;
    }
}


export const decodeToken = async(req:Request , res:Response , next:NextFunction) =>{
    try {
        const token = extractToken(req)
        console.log("this si the toke to decode",token)

        if(!token?.refresh_token){
            console.log("no token for decode")
            res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS})
            return
        }
        
        if(await isBlacklisted(token.access_token)){
            console.log("token is blacklisted");
            res.status(HTTP_STATUS.UNAUTHORIZED)
            .json({message:"Token is blacklisted"})
            return
        };
        console.log("hey boiiii")
        const user =  tokenService.decodeAccessToken(token?.access_token);
        console.log("user from decode access token",user);
        

        (req as CustomRequest).user ={
            id:user?.id,
            email:user?.email,
            role:user?.role,
            access_token:token.access_token,
            refresh_token:token.refresh_token
        };

        next()

    } catch (error) {
        console.log("failed to decode",error)
    }
}


export const authorizeRole = (allowedRoles:string[])=>{
    return (req:Request , res : Response , next:NextFunction)=>{
        
        const user = (req as CustomRequest).user

        if(!user || !allowedRoles.includes(user.role)){
            console.log("this role is not allowed")
            res.status(HTTP_STATUS.FORBIDDEN).json({message:ERROR_MESSAGES.NOT_ALLOWED,user:user ? user.role : ""})
            return
        }
        next()
    }
}