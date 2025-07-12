import { container } from "tsyringe";

import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ClientRepository } from "interfaceAdpaters/repositories/cllient.repository";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "interfaceAdpaters/repositories/vendor.repository";

import { IRefreshTokenRepository } from "@entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { refreshTokenRepository } from "interfaceAdpaters/repositories/refresh-token.repository";
import { IOtpRepository } from "@entities/repositoryInterfaces/auth/otp-repository.interface";
import { OTPRepository } from "interfaceAdpaters/repositories/otp.repository";

export class RepositoryRegistry {
    static registerRepositories():void {
        container.register<IClientRepository>("IClientRepository",{
            useClass:ClientRepository
        });

        container.register<IVendorRepository>("IVendorRepository",{
            useClass:VendorRepository
        })

        container.register<IRefreshTokenRepository>("IRefreshTokenRepository",{
            useClass:refreshTokenRepository
        })

        container.register<IOtpRepository>("IOTPRepository",{
            useClass:OTPRepository
        })
    }
}