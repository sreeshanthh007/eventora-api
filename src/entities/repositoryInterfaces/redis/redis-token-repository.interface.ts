
export interface IRedisTokenRepository {
    blackListToken(token:string,expiresIn:number) : Promise<void>
    isTokenBlacklisted(token:string) : Promise<boolean>
}