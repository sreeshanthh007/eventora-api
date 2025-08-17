

export interface IOtpCacheRepository {
    saveOtp(key:string,otp:string,ttlSec:number) : Promise<void>
    getOtp(key:string) : Promise<string | null>
    deleteOtp(key:string) : Promise<void>
}