import { inject , injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IAdminRepository } from "@entities/repositoryInterfaces/admin/admin-repository-interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { WalletDTO } from "@shared/dtos/wallet.dto";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";


@injectable()
export class AdminLoginStrategy implements ILoginStrategy {
    constructor(
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService,
        @inject("IAdminRepository") private _adminRepository : IAdminRepository,
        @inject("IWalletRepository") private _walletRepository : IWalletRepository,
        @inject("IUUIDGeneratorService") private _generateUUID : IUUIDGeneratorService
    ){}


    async login(user: LoginUserDTO): Promise<LoginResponseDTO> {
       const admin = await this._adminRepository.findByEmail(user.email);

    if (!admin) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (user.password) {
      const isPasswordMatch = await this._passwordBcryptService.compare(user.password, admin.password);
      if (!isPasswordMatch) {
        throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
      }
    }


    const isAdminWalletExist = await this._walletRepository.findWallet(admin._id.toString())
   
    if(!isAdminWalletExist){
      const walletId = this._generateUUID.generate()
       const walletDetails : WalletDTO = {
        balance:0,
        userId:admin._id.toString(),
        userType:"admin",
        walletId:walletId
       }

      await this._walletRepository.createWallet(walletDetails)
    }

    return {
      _id: admin._id.toString(),
      email: admin.email,
      role: "admin",
    };
  }
    }
