
    import { container } from "tsyringe";
    import { IBcrypt } from "@frameworks/security/bcrypt.interface";
    import { OTPBcrypt } from "@frameworks/security/OTP.bcrypt.";
    import { passwordBcrypt } from "@frameworks/security/password.bcrypt";


    import { IRegisterStrategy } from "@usecases/auth/register-strategies/register-strategy.interface";
    import { ILoginStrategy } from "@usecases/auth/login-strategies/login-strategy.interface";
    import { ClientLoginStrategy } from "@usecases/auth/login-strategies/client-login-strategy";
    import { CLientRegisterStrategy } from "@usecases/auth/register-strategies/client-register-strategy";
    import { VendorRegisterStrategy } from "@usecases/auth/register-strategies/vendor-register-strategy";
    import { VendorLoginStrategy } from "@usecases/auth/login-strategies/vendor-login-strategy";

    import { ITokenService } from "@usecases/auth/interfaces/token-service-interface";
    import { jwtService } from "interfaceAdpaters/services/jwtService";
    import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";
    import { EmailService } from "interfaceAdpaters/services/emailServices";
    import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
    import { OTPService } from "interfaceAdpaters/services/OTPService";
    import { IUserExistenceService } from "@entities/serviceInterfaces/user-existence-service.interface";
    import { UserExistService } from "interfaceAdpaters/services/user-existService";


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




    // =====error====//
    import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
    import { logger } from "@frameworks/logger/winston-logger";
    import { WinstonLoggerAdapter } from "interfaceAdpaters/services/logger/winston-logger-adapter";
    import { LoggerMiddleWare } from "interfaceAdpaters/middlewares/logger.middleware";
    import { ErrorMiddleware } from "interfaceAdpaters/middlewares/error.middleware";

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

            container.register<IRegisterStrategy>("clientRegisterStrategy",{
                useClass:CLientRegisterStrategy
            });

            container.register<ILoginStrategy>("ClientLoginStrategy",{
                useClass:ClientLoginStrategy
            });

            container.register<IRegisterStrategy>("VendorRegisterStrategy",{
                useClass:VendorRegisterStrategy
            })

            container.register<ILoginStrategy>("VendorLoginStrategy",{
                useClass:VendorLoginStrategy
            });

            container.register<ITokenService>("ITokenService",{
                useClass:jwtService
            }); 

            container.register<IOTPService>("IOTPService",{
                useClass:OTPService
            })

            container.register<IEmailService>("IEmailService",{
                useClass:EmailService
            })
            
            container.register<IUserExistenceService>("IUserExistenceService",{
                useClass:UserExistService
            })








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