    import { inject , injectable } from "tsyringe";
    import { ILoginStrategy } from "./login-strategy.interface";
    import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
    import { CustomError } from "@entities/utils/custom.error";
    import { HTTP_STATUS , ERROR_MESSAGES } from "@shared/constants";
    import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";
    import { toVendorResponse } from "@mappers/VendorMapper";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
    @injectable()
    export class VendorLoginStrategy implements ILoginStrategy{
        constructor(
            @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService,
            @inject("IVendorRepository") private _vendorRepository : IVendorRepository
        ){}

       async login(user: LoginUserDTO): Promise<LoginResponseDTO> {
        const vendor = await this._vendorRepository.findByEmail(user.email);

        if (!vendor) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

     if (vendor.status !== "active") {
          throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN);
    }

    if (user.password) {
      const isPasswordMatch = await this._passwordBcryptService.compare(
        user.password,
        vendor.password
      );
      if (!isPasswordMatch) {
        throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
      }
    }
        return toVendorResponse(vendor);
  }
    }

