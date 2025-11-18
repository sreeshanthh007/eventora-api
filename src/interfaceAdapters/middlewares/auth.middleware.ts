import { Request , Response , NextFunction } from "express";
import { jwtService } from "interfaceAdapters/services/jwt/jwtService";
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



const roleMap: Record<string, string> = {
  "_cl": "client",
  "_ad": "admin",
  "_ve": "vendor"
};

const extractToken = (req: Request): { access_token: string; refresh_token: string } | null => {

     const basePath = req.baseUrl.split("/");
    
    const userType = roleMap[basePath[2]]


   

  if (["client", "vendor", "admin"].includes(userType)) {
    return {
      access_token: req.cookies[`${userType}_access_token`] || null,
      refresh_token: req.cookies[`${userType}_refresh_token`] || null,
    };
  }

  return null;
};


const isBlacklisted = async(token:string) :Promise<boolean> =>{
  
    
    const result = await RedisClient.get(token)
    console.log("is token blacklisted",result)
    
    return result!==null
}


export const verifyAuth = async(req:Request,res:Response,next:NextFunction) : Promise<void>=>{
    try {
        const token = extractToken(req)
   
        
     if (!token) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    if(await isBlacklisted(token.access_token)){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({message:ERROR_MESSAGES.TOKEN_BLACKLISTED});
        return;
    }
 

    const user = tokenService.verifyAccessToken(token.access_token) as CustomJWTPayload

    if(!user || !user.id){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS});
        return
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
      .json({ message: ERROR_MESSAGES.INVALID_TOKEN,statuscode:HTTP_STATUS.UNAUTHORIZED});
    return;
    }
}


export const decodeToken = async(req:Request , res:Response , next:NextFunction) =>{
    try {
        const token = extractToken(req)
       

        if(!token?.refresh_token){
            console.log("no token for decode")
            res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS})
            return
        }
        
   
     
        const user =  tokenService.verifyRefreshToken(token?.refresh_token) as CustomJWTPayload;
      
        
            const newAccessToken = tokenService.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
            });


        (req as CustomRequest).user ={
            id:user?.id,
            email:user?.email,
            role:user?.role,
            access_token: newAccessToken,
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