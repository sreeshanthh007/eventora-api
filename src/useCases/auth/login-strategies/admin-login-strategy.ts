import { inject , injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IAdminRepository } from "@entities/repositoryInterfaces/admin/admin-repository-interface";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { LoginUserDTO } from "@shared/dtos/user.dto";
import { IUserEntity } from "@entities/models/user.entity";

@injectable()

export class AdminLoginStrategy implements ILoginStrategy {
    constructor(
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt,
        @inject("IAdminRepository") private adminRepository : IAdminRepository
    ){}


    async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
        const admin = await this.adminRepository.findByEmail(user.email)

        if(!admin){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        if(user.password){
            const isPasswordMatch = await this.passwordBcrypt.compare(
                user.password,
                admin.password
            );
            if(!isPasswordMatch){
                throw new CustomError(
                ERROR_MESSAGES.INVALID_CREDENTIALS,
                HTTP_STATUS.BAD_REQUEST
                )
            }
        }
        return admin
    }
}