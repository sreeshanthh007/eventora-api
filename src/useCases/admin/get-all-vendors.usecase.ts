import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-all-vendors.usecase.interface";
import { PaginatedUsers } from "interfaceAdapters/models/paginatedUsers";
import { mapClientAndVendorEntityToTableRow } from "@mappers/ClientMapper";
import { PAGINATION } from "@shared/constants";



@injectable()
export class GetAllVendorUseCase implements IGetAllVendorsUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepository : IVendorRepository
    ){}

    async  execute(limit: number, searchTerm: string, current: number): Promise<PaginatedUsers>  {

       
      const safePage = Math.max(
        PAGINATION.PAGE,
        current || PAGINATION.PAGE
      )
      
      const safeLimit = Math.min(
        PAGINATION.MAX_LIMIT,
        Math.max(1,limit || PAGINATION.LIMIT)
      )
      
      
    
      const skip = (safePage - 1) * safeLimit;
   

      const { user, total } = await this.vendorRepository.findPaginatedVendors(
        searchTerm,
        skip,
        limit
      );

      const mappedUsers = user.map(mapClientAndVendorEntityToTableRow)

      const response: PaginatedUsers = {
        user:mappedUsers,
        total: Math.ceil(total / limit), 
      };

    return response
}
}