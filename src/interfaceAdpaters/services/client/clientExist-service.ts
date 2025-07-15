import { inject , injectable } from "tsyringe";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IClientExistService } from "@entities/serviceInterfaces/client-exist.service.interface";



@injectable()
export class ClientExistService implements IClientExistService{
    constructor(
        @inject("IClientRepository")  private clientRepository : IClientRepository
    ){}

    async emailExists(email: string): Promise<boolean | null> {
      const exist =   await this.clientRepository.findByEmail(email)
      
      return Boolean(exist)
    }
}