

export interface IVendorExistService {
    emailExist(email:string) :Promise<Boolean | null>
}