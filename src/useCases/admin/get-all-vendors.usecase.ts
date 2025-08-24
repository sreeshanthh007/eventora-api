import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-all-vendors.usecase";
import { PaginatedUsers } from "interfaceAdpaters/models/paginatedUsers";
import { mapClientAndVendorEntityToTableRow } from "interfaceAdpaters/mappers/ClientMapper";
import { FilterQuery } from "mongoose";
import { IVendorEntity } from "@entities/models/vendor.entity";


@injectable()
export class GetAllVendorUseCase implements IGetAllVendorsUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepository : IVendorRepository
    ){}

    async  execute(limit: number, searchTerm: string, current: number): Promise<PaginatedUsers>  {

         const filter : FilterQuery<IVendorEntity> = {};
         
            if (searchTerm) {

            filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const validPageNumber = Math.max(1, current || 1);
      const skip = (validPageNumber - 1) * limit;
   

      const { user, total } = await this.vendorRepository.findPaginatedClients(
        filter,
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