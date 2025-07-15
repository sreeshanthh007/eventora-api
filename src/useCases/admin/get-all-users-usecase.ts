import { inject, injectable } from "tsyringe";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IGetAllUsersUseCase } from "@entities/useCaseInterfaces/admin/get-all-users.usecase";
import { IClientEntity } from "@entities/models/client.entity";
import { response } from "express";
import { PaginatedUsers } from "@entities/models/paginatedUsers.entity";
@injectable()
export class getAllUsersUseCase implements IGetAllUsersUseCase{
    constructor(
        @inject("IClientRepository") private clientRepository : IClientRepository
    ){}

    async  execute(limit: number, searchTerm: string, current: number): Promise<PaginatedUsers>  {

         let filter: any = {};
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

      const response: PaginatedUsers = {
        user,
        total: Math.ceil(total / limit),
      };

    return response
}
}