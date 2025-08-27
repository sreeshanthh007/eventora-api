import { IVendorExistService } from "@entities/serviceInterfaces/vendor-exist.service.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class VendorExistService implements IVendorExistService{
    constructor(
        @inject("IVendorRepository") private vendorRepository : IVendorRepository
    ){}


    async emailExist(email: string): Promise<boolean | null> {
       const exist =  await this.vendorRepository.findByEmail(email)
    
       return Boolean(exist)
    }
}