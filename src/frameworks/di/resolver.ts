
import { container } from "tsyringe";

import { DependencyInjection } from ".";

import { registerUserController } from "interfaceAdpaters/controllers/auth/register-controller";
import { loginUserController } from "interfaceAdpaters/controllers/auth/login-controller";
import { VerifyOTPController } from "interfaceAdpaters/controllers/auth/verifyOtp-controller";
import { SendOTPController } from "interfaceAdpaters/controllers/auth/sent-otp-controller";
import { RefreshTokenController } from "interfaceAdpaters/controllers/auth/refresh-token-controller";


// ======logger=========//
import { LoggerMiddleWare } from "interfaceAdpaters/middlewares/logger.middleware";
import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { ErrorMiddleware } from "interfaceAdpaters/middlewares/error.middleware";


DependencyInjection.registerAll()

export const registerController = container.resolve(registerUserController);

export const loginController = container.resolve(loginUserController);

export const verifyOtpController = container.resolve(VerifyOTPController)

export const sentOtpController = container.resolve(SendOTPController)

export const refreshTokenController = container.resolve(RefreshTokenController)






// logger  middleware//
export const injectedLoggerMiddleWare  = container.resolve<LoggerMiddleWare>(LoggerMiddleWare)
export const injectedLogger = container.resolve<ILogger>("ILogger")


// =========error handling middleware=========//
export const errorMiddleware = container.resolve<ErrorMiddleware>("ErrorMiddleware")