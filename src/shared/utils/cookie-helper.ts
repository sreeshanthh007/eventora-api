
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
        sameSite:isProduction ? "none" : "strict",
         maxAge: 15 * 60 * 1000 
    });

    res.cookie(refreshTokenName,refreshToken,{
        httpOnly:true,
        secure:isProduction,
        sameSite: isProduction ? "none" : "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000 
    });
};


export const updateCookieWithAccessToken = (
    res: Response,
    accessToken: string,
    accessTokenName: string
) => {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie(accessTokenName, accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: 15 * 60 * 1000, 
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

