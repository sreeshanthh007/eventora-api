
import Jwt,{  JwtPayload , Secret } from "jsonwebtoken";
import { ITokenService } from "@usecases/auth/interfaces/token-service-interface";
import { config } from "@shared/config";
import ms from "ms"
import { injectable } from "tsyringe";

interface JwtPayloadData {
    id:string,
    email:string,
    role:string
}

@injectable()

export class jwtService implements ITokenService{
    private jwtSecrect : Secret;
    private accessExpiresIn:string;
    private refreshExpirenIn:string

    constructor(){
        this.jwtSecrect = config.jwt.JWT_SECRECT_KEY,
        this.accessExpiresIn = config.jwt.ACCESS_EXPIRES_IN,
        this.refreshExpirenIn=config.jwt.REFRESH_EXPIRES_IN
    }

    generateAccessToken(payload: JwtPayloadData): string {
        return Jwt.sign(payload,this.jwtSecrect,{
            expiresIn:this.accessExpiresIn as ms.StringValue
        });
    }

    generateRefreshToken(payload: JwtPayloadData): string {
        return Jwt.sign(payload,this.jwtSecrect,{
            expiresIn:this.refreshExpirenIn as ms.StringValue
        });
    }
    verifyAccessToken(token: string): JwtPayload | null {
        try {
            return Jwt.verify(token,this.jwtSecrect) as JwtPayload
        } catch (error) {
            console.log("error in verifying access token",error)
            return null
        }
    }

    verifyRefreshToken(token: string): JwtPayload | null {
        try {
            return Jwt.verify(token,this.jwtSecrect) as JwtPayload
        } catch (error) {
            console.log("error in verifying refresh token",error)
            return null
        }
    }

    decodeAccessToken(token: string): JwtPayload | null {
        try {
            return Jwt.decode(token) as JwtPayload
        } catch (error) {
            console.error("refresh token verification failed",error)
            return null
        }
    }

}