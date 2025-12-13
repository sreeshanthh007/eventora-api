import { inject, injectable } from "tsyringe";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IGetAllUsersUseCase } from "@entities/useCaseInterfaces/admin/get-all-users.usecase.interface";
import { PaginatedUsers } from "interfaceAdapters/models/paginatedUsers";
import { mapClientAndVendorEntityToTableRow } from "@mappers/ClientMapper";
import { PAGINATION } from "@shared/constants";


@injectable()
export class getAllUsersUseCase implements IGetAllUsersUseCase{
    constructor(
        @inject("IClientRepository") private clientRepository : IClientRepository
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
   

      const { user, total } = await this.clientRepository.findPaginatedClients(
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