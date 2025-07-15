import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-all-vendors.usecase";
import { PaginatedUsers } from "@entities/models/paginatedUsers.entity";


@injectable()
export class GetAllVendorUseCase implements IGetAllVendorsUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepository : IVendorRepository
    ){}

    async  execute(limit: number, searchTerm: string, current: number): Promise<PaginatedUsers>  {

         let filter: any = {};
            if (searchTerm) {

            filter.$or = [
        { firstName: { $regex: searchTerm, $options: "i" } },
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

      const response: PaginatedUsers = {
        user,
        total: Math.ceil(total / limit),
      };

    return response
}
}