"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const cllient_repository_1 = require("interfaceAdpaters/repositories/cllient.repository");
const vendor_repository_1 = require("interfaceAdpaters/repositories/vendor.repository");
const refresh_token_repository_1 = require("interfaceAdpaters/repositories/refresh-token.repository");
const otp_repository_1 = require("interfaceAdpaters/repositories/otp.repository");
class RepositoryRegistry {
    static registerRepositories() {
        tsyringe_1.container.register("IClientRepository", {
            useClass: cllient_repository_1.ClientRepository
        });
        tsyringe_1.container.register("IVendorRepository", {
            useClass: vendor_repository_1.VendorRepository
        });
        tsyringe_1.container.register("IRefreshTokenRepository", {
            useClass: refresh_token_repository_1.refreshTokenRepository
        });
        tsyringe_1.container.register("IOTPRepository", {
            useClass: otp_repository_1.OTPRepository
        });
    }
}
exports.RepositoryRegistry = RepositoryRegistry;
