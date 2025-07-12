
import { inject , injectable } from "tsyringe";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUserExistenceService } from "@entities/serviceInterfaces/user-existence-service.interface";


@injectable()
export class UserExistService implements IUserExistenceService {
    constructor(
        @inject("IClientRepository") private clientRepo:IClientRepository,
        @inject("IVendorRepository") private vendorRepo:IVendorRepository
    ){}

    async emailExists(email: string): Promise<boolean> {
        const [client , vendor] = await Promise.all([
            this.clientRepo.findByEmail(email),
            this.vendorRepo.findByEmail(email)
        ]);

        return Boolean(client || vendor)
    }
}