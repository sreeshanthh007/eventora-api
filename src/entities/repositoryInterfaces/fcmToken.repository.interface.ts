

export interface IFcmTokenRepository {
    findByIdAndSaveToken(userId:string,token:string) : Promise<void>
}