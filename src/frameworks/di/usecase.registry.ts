
    import { container } from "tsyringe";
    import { IBcrypt } from "@frameworks/security/bcrypt.interface";
    import { OTPBcrypt } from "@frameworks/security/OTP.bcrypt.";
    import { passwordBcrypt } from "@frameworks/security/password.bcrypt";


    import { IRegisterStrategy } from "@usecases/auth/register-strategies/register-strategy.interface";
    import { ILoginStrategy } from "@usecases/auth/login-strategies/login-strategy.interface";
    import { ClientLoginStrategy } from "@usecases/auth/login-strategies/client-login-strategy";
    import { ClientGoogleLoginStrategy } from "@usecases/auth/login-strategies/client-google-login.strategy";
    import { VendorGoogleLoginStrategy } from "@usecases/auth/login-strategies/vendor-google-login.strategy";
    import { CLientRegisterStrategy } from "@usecases/auth/register-strategies/client-register-strategy";
    import { VendorRegisterStrategy } from "@usecases/auth/register-strategies/vendor-register-strategy";
    import { VendorLoginStrategy } from "@usecases/auth/login-strategies/vendor-login-strategy";
    import { AdminLoginStrategy } from "@usecases/auth/login-strategies/admin-login-strategy";

    import { ITokenService } from "@usecases/auth/interfaces/token-service-interface";
    import { jwtService } from "interfaceAdpaters/services/jwtService";
    import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";
    import { EmailService } from "interfaceAdpaters/services/emailServices";
    import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
    import { OTPService } from "interfaceAdpaters/services/OTPService";
    import { IUserExistenceService } from "@entities/serviceInterfaces/user-existence-service.interface";
    import { UserExistService } from "interfaceAdpaters/services/user-existService";
    import { IClientExistService } from "@entities/serviceInterfaces/client-exist.service.interface";
    import { ClientExistService } from "interfaceAdpaters/services/client/clientExist-service";
    import { sendForgotPasswordOtp } from "@usecases/sent-forgot.password-otp.usecase";

    import { IRegisterUseCase } from "@entities/useCaseInterfaces/auth/register-usecase.interface";
    import { RegisterUseCase } from "@usecases/register-user.usecase";
    import { ILoginUserCase } from "@entities/useCaseInterfaces/auth/login-usecase.interface";
    import { LoginUseCase } from "@usecases/login-user.usecase";
    import { ISendEmailUseCase } from "@entities/useCaseInterfaces/auth/send-email-usercase.interface";
    import { SendEmailUseCase } from "@usecases/send-email.usecase";
    import { IVerifyOtpUsecase } from "@entities/useCaseInterfaces/auth/verifyOtp-usecase.interface";
    import { VerifyOTPUseCase } from "@usecases/verify-otp.usecase";
    import { IGenerateTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-token.interface";
    import { GenerataTokenUseCase } from "@usecases/generate-token.usecase";
    import { IRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-refresh-token.interface";
    import { refreshTokenUsesCase } from "@usecases/refresh-token.usecase";


    import { IForgotUpdatePasswordUseCase } from "@entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
    import { ForgotClientUpdatePasswordUseCase } from "@usecases/client/clientUpdatePasswordSUseCase";



    // =====error====//
    import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
    // import { logger } from "@frameworks/logger/winston-logger";
    import { WinstonLoggerAdapter } from "interfaceAdpaters/services/logger/winston-logger-adapter";
    import { LoggerMiddleWare } from "interfaceAdpaters/middlewares/logger.middleware";
    import { ErrorMiddleware } from "interfaceAdpaters/middlewares/error.middleware";
import { ISendOtpUsecase } from "@entities/useCaseInterfaces/auth/sendOtp-usecase.interface";
import { IGetAllUsersUseCase } from "@entities/useCaseInterfaces/admin/get-all-users.usecase";
import { getAllUsersUseCase } from "@usecases/admin/get-all-users-usecase";
import { IuserToggleStatusUseCase } from "@entities/useCaseInterfaces/admin/handle-user-toggle-status.usecase.interface";
import { UserToggleStatusUseCase } from "@usecases/admin/handle-user-toggle-status.usecase";
import { ForgotVendorUpdatePasswordUseCase } from "@usecases/vendor/forgotPasswordVendorUseCase";
import { IGetAllVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-all-vendors.usecase";
import { GetAllVendorUseCase } from "@usecases/admin/get-all-vendors.usecase";
import { IHandleToggleVendorUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle.vendor.usecase";
import { HandleToggleVendorStatusUseCase } from "@usecases/admin/handle-toggle-vendor.usecase";
import { IVendorExistService } from "@entities/serviceInterfaces/vendor-exist.service.interface";
import { VendorExistService } from "interfaceAdpaters/services/vendor/vendorExist-service";
import { IRevokeRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/revoke-refresh-token-usecase";
import { RevokeRefreshTokenUseCase } from "@usecases/revoke-refresh-token.usecase";
import { IBlacklistTokenUseCase } from "@entities/useCaseInterfaces/auth/blackList-token-interface";
import { BlacklistTokenUseCase } from "@usecases/auth/blacklist-token.usecase";
import { IGoogleUseCase } from "@entities/useCaseInterfaces/auth/google-login-usecase.interface";
import { GoogleuseCase } from "@usecases/auth/google-login-usecase";

    export class UseCaseRegistry {
        static registerUseCases():void{
            container.register<IRegisterUseCase>("IRegisterUseCase",{
                useClass:RegisterUseCase
            });

            container.register<IBcrypt>("IPasswordBcrypt",{
                useClass:passwordBcrypt
            });

            container.register<IBcrypt>("IOTPBcrypt",{
                useClass:OTPBcrypt
            });

            container.register<ILoginUserCase>("ILoginUserUseCase",{
                useClass:LoginUseCase
            });

            container.register<IRevokeRefreshTokenUseCase>("IRevokeRefreshTokenUseCase",{
                useClass:RevokeRefreshTokenUseCase
            })

            container.register<ISendEmailUseCase>("ISendEmailUseCase",{
                useClass:SendEmailUseCase
            });

            container.register<IVerifyOtpUsecase>("IVerifyOTPUseCase",{
                useClass:VerifyOTPUseCase
            });
            container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase",{
                useClass:GenerataTokenUseCase
            });

            container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase",{
                useClass:refreshTokenUsesCase
            });

            container.register<IBlacklistTokenUseCase>("IBlacklistTokenUseCase",{
                useClass:BlacklistTokenUseCase
            })  

            container.register<IRegisterStrategy>("clientRegisterStrategy",{
                useClass:CLientRegisterStrategy
            });

            container.register<ILoginStrategy>("ClientLoginStrategy",{
                useClass:ClientLoginStrategy
            });

            container.register<ILoginStrategy>("ClientGoogleLoginStrategy",{
                useClass:ClientGoogleLoginStrategy
            })

            container.register<IRegisterStrategy>("VendorRegisterStrategy",{
                useClass:VendorRegisterStrategy
            })

            container.register<ILoginStrategy>("VendorLoginStrategy",{
                useClass:VendorLoginStrategy
            });

            container.register<ILoginStrategy>("VendorGoogleLoginStrategy",{
                useClass:VendorGoogleLoginStrategy
            });

            container.register<ILoginStrategy>("AdminLoginStrategy",{
                useClass:AdminLoginStrategy
            });

            container.register<ITokenService>("ITokenService",{
                useClass:jwtService
            }); 

            container.register<IOTPService>("IOTPService",{
                useClass:OTPService
            });

            container.register<ISendOtpUsecase>("ISendOTPForPasswordUseCase",{
                useClass:sendForgotPasswordOtp
            });

            container.register<IEmailService>("IEmailService",{
                useClass:EmailService
            })
            
            container.register<IUserExistenceService>("IUserExistenceService",{
                useClass:UserExistService
            })

            container.register<IVendorExistService>("IVendorExistService",{
                useClass:VendorExistService
            });

            container.register<IClientExistService>("IClientExistService",{
                useClass:ClientExistService
            })

            container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase",{
                useClass:getAllUsersUseCase
            });

            container.register<IuserToggleStatusUseCase>("IUserToggleStatusUseCase",{
                useClass: UserToggleStatusUseCase
            });

            container.register<IGetAllVendorsUseCase>("IGetAllVendorsUseCase",{
                useClass:GetAllVendorUseCase
            });


                container.register<IHandleToggleVendorUseCase>("IHandleToggleVendorUseCase",{
                    useClass:HandleToggleVendorStatusUseCase
                })


                container.register<IForgotUpdatePasswordUseCase>("IForgotClientUpdatePasswordUseCase",{
                    useClass:ForgotClientUpdatePasswordUseCase
                });

                container.register<IForgotUpdatePasswordUseCase>("ForgotVendorUpdatePasswordUseCase",{
                    useClass:ForgotVendorUpdatePasswordUseCase
                });

                container.register<IGoogleUseCase>("IGoogleUseCase",{
                    useClass:GoogleuseCase
                });  




                




            // ======logger==========//

            container.register<ILogger>("ILogger",{
                useClass:WinstonLoggerAdapter
            });

            container.register<LoggerMiddleWare>("LoggerMiddleware",{
                useClass:LoggerMiddleWare
            });

            // ======error handler========//
            container.register<ErrorMiddleware>("ErrorMiddleware",{
                useClass:ErrorMiddleware
            });

            


        }
    }