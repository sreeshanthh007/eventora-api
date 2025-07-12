
import { Response } from "express";

export const setAuthCookies =(
    res:Response,
    accessToken: string,
    refreshToken : string,
    accessTokenName : string,
    refreshTokenName : string
)=>{
    const isProduction = process.env.NODE_ENV == "production"
  
    res.cookie(accessTokenName,accessToken,{    
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "strict"
    });

    res.cookie(refreshTokenName,refreshToken,{
        httpOnly:true,
        secure:isProduction,
        sameSite: isProduction ? "none" : "strict"
    });
};


export const updateCookieWithAccessToken = (
    res:Response,
    accessToken:string,
    accessTokenName:string
) =>{

    const isProduction = process.env.NODE_ENV =="production"


    res.cookie(accessTokenName,accessToken,{
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "strict"
    });
};


export const clearAuthCookie = (
    res:Response,
    accessTokenName:string,
    refreshTokenName:string
) =>{
    res.clearCookie(accessTokenName)
    res.clearCookie(refreshTokenName)
};

