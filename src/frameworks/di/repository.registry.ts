import { container } from "tsyringe";

import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ClientRepository } from "interfaceAdpaters/repositories/client/cllient.repository";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "interfaceAdpaters/repositories/vendor/vendor.repository";
import { IAdminRepository } from "@entities/repositoryInterfaces/admin/admin-repository-interface";
import { AdminRepository } from "interfaceAdpaters/repositories/admin/admin.repository";

import { IRefreshTokenRepository } from "@entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { refreshTokenRepository } from "interfaceAdpaters/repositories/auth/refresh-token.repository";
import { IOtpRepository } from "@entities/repositoryInterfaces/auth/otp-repository.interface";
import { OTPRepository } from "interfaceAdpaters/repositories/auth/otp.repository";
import { IRedisTokenRepository } from "@entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { RedisTokenRepository } from "interfaceAdpaters/repositories/redis/redisRepository";

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
        });

        container.register<IAdminRepository>("IAdminRepository",{
            useClass:AdminRepository
        });

        container.register<IRedisTokenRepository>("IRedisTokenRepository",{
            useClass:RedisTokenRepository
        })
    }
}