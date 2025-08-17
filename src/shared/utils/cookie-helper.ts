
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
         maxAge: 15 * 60 * 1000 // 15 min
    });

    res.cookie(refreshTokenName,refreshToken,{
        httpOnly:true,
        secure:isProduction,
        sameSite: isProduction ? "none" : "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
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
        maxAge: 15 * 60 * 1000, // 15 minutes
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

