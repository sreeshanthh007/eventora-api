

export interface IVendorExistService {
    emailExist(email:string) :Promise<boolean | null>
}