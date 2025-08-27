import { IVendorEntity } from "@entities/models/vendor.entity";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetRequestedVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-requested-vendors.usecase";
import { toRequestedVendorTableDTO} from "interfaceAdpaters/mappers/VendorMapper";
import { PaginatedVendors } from "interfaceAdpaters/models/PaginatedVendors";
import { FilterQuery } from "mongoose";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetRequestedVendorsUseCase implements IGetRequestedVendorsUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepo : IVendorRepository
    ){}

    async execute(limit: number, searchTerm: string, current: number): Promise<PaginatedVendors> {
        
        const filter : FilterQuery<IVendorEntity>={}
        
        if(searchTerm){
            filter.$or=[
                {name:{$regex:searchTerm,$options:"i"}},
                {email:{$regex:searchTerm,$options:"i"}}
            ]
        };

        const validPageNumber = Math.max(1,current || 1)
        const skip = (validPageNumber - 1) * limit 


        const {vendors,total} = await this.vendorRepo.findPaginatedVendorByStatus(filter,skip,limit)

         const response = {
            vendors : vendors.map(toRequestedVendorTableDTO),
            total : Math.ceil(total / limit)
        }
        return response
    }
}