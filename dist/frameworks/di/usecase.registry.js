"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const OTP_bcrypt_1 = require("@frameworks/security/OTP.bcrypt.");
const password_bcrypt_1 = require("@frameworks/security/password.bcrypt");
const client_login_strategy_1 = require("@usecases/auth/login-strategies/client-login-strategy");
const client_register_strategy_1 = require("@usecases/auth/register-strategies/client-register-strategy");
const vendor_register_strategy_1 = require("@usecases/auth/register-strategies/vendor-register-strategy");
const vendor_login_strategy_1 = require("@usecases/auth/login-strategies/vendor-login-strategy");
const jwtService_1 = require("interfaceAdpaters/services/jwtService");
const emailServices_1 = require("interfaceAdpaters/services/emailServices");
const OTPService_1 = require("interfaceAdpaters/services/OTPService");
const user_existService_1 = require("interfaceAdpaters/services/user-existService");
const register_user_usecase_1 = require("@usecases/register-user.usecase");
const login_user_usecase_1 = require("@usecases/login-user.usecase");
const send_email_usecase_1 = require("@usecases/send-email.usecase");
const verify_otp_usecase_1 = require("@usecases/verify-otp.usecase");
const generate_token_usecase_1 = require("@usecases/generate-token.usecase");
const refresh_token_usecase_1 = require("@usecases/refresh-token.usecase");
class UseCaseRegistry {
    static registerUseCases() {
        tsyringe_1.container.register("IRegisterUseCase", {
            useClass: register_user_usecase_1.RegisterUseCase
        });
        tsyringe_1.container.register("IPasswordBcrypt", {
            useClass: password_bcrypt_1.passwordBcrypt
        });
        tsyringe_1.container.register("IOTPBcrypt", {
            useClass: OTP_bcrypt_1.OTPBcrypt
        });
        tsyringe_1.container.register("ILoginUserUseCase", {
            useClass: login_user_usecase_1.LoginUseCase
        });
        tsyringe_1.container.register("ISendEmailUseCase", {
            useClass: send_email_usecase_1.SendEmailUseCase
        });
        tsyringe_1.container.register("IVerifyOTPUseCase", {
            useClass: verify_otp_usecase_1.VerifyOTPUseCase
        });
        tsyringe_1.container.register("IGenerateTokenUseCase", {
            useClass: generate_token_usecase_1.GenerataTokenUseCase
        });
        tsyringe_1.container.register("IRefreshTokenUseCase", {
            useClass: refresh_token_usecase_1.refreshTokenUsesCase
        });
        tsyringe_1.container.register("clientRegisterStrategy", {
            useClass: client_register_strategy_1.CLientRegisterStrategy
        });
        tsyringe_1.container.register("ClientLoginStrategy", {
            useClass: client_login_strategy_1.ClientLoginStrategy
        });
        tsyringe_1.container.register("VendorRegisterStrategy", {
            useClass: vendor_register_strategy_1.VendorRegisterStrategy
        });
        tsyringe_1.container.register("VendorLoginStrategy", {
            useClass: vendor_login_strategy_1.VendorLoginStrategy
        });
        tsyringe_1.container.register("ITokenService", {
            useClass: jwtService_1.jwtService
        });
        tsyringe_1.container.register("IOTPService", {
            useClass: OTPService_1.OTPService
        });
        tsyringe_1.container.register("IEmailService", {
            useClass: emailServices_1.EmailService
        });
        tsyringe_1.container.register("IUserExistenceService", {
            useClass: user_existService_1.UserExistService
        });
    }
}
exports.UseCaseRegistry = UseCaseRegistry;
