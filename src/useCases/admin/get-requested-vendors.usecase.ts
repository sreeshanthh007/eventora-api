
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetRequestedVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-requested-vendors.usecase.interfaces";
import { toRequestedVendorTableDTO} from "@mappers/VendorMapper";
import { PAGINATION } from "@shared/constants";
import { PaginatedVendors } from "interfaceAdapters/models/PaginatedVendors";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetRequestedVendorsUseCase implements IGetRequestedVendorsUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepo : IVendorRepository
    ){}

    async execute(limit: number, searchTerm: string, current: number): Promise<PaginatedVendors> {
        
      
      const safePage = Math.max(
        PAGINATION.PAGE,
        current || PAGINATION.PAGE
      );
      
      const safeLimit = Math.min(
        PAGINATION.MAX_LIMIT,
        Math.max(1, limit || PAGINATION.LIMIT)
      );
      
        
        const skip = (safePage - 1) * safeLimit 


        const {vendors,total} = await this.vendorRepo.findPaginatedVendorByStatus(searchTerm,skip,limit)

         const response = {
            vendors : vendors.map(toRequestedVendorTableDTO),
            total : Math.ceil(total / limit)
        }
        return response
    }
}