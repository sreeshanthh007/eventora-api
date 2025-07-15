

export interface IClientExistService{
    emailExists(email:string) : Promise<boolean | null>
}