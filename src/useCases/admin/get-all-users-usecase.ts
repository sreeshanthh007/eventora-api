import { inject, injectable } from "tsyringe";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IGetAllUsersUseCase } from "@entities/useCaseInterfaces/admin/get-all-users.usecase";
import { PaginatedUsers } from "interfaceAdpaters/models/paginatedUsers";
import { mapClientAndVendorEntityToTableRow } from "interfaceAdpaters/mappers/ClientMapper";
import { FilterQuery } from "mongoose";
import { IClientEntity } from "@entities/models/client.entity";
@injectable()
export class getAllUsersUseCase implements IGetAllUsersUseCase{
    constructor(
        @inject("IClientRepository") private clientRepository : IClientRepository
    ){}

    async  execute(limit: number, searchTerm: string, current: number): Promise<PaginatedUsers>  {

         const filter: FilterQuery<IClientEntity> = {};
      
            if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const validPageNumber = Math.max(1, current || 1);
      const skip = (validPageNumber - 1) * limit;
   

      const { user, total } = await this.clientRepository.findPaginatedClients(
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