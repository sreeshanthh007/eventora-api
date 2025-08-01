
import { container } from "tsyringe";

import { DependencyInjection } from ".";

import { registerUserController } from "interfaceAdpaters/controllers/auth/register-controller";
import { loginUserController } from "interfaceAdpaters/controllers/auth/login-controller";
import { VerifyOTPController } from "interfaceAdpaters/controllers/auth/verifyOtp-controller";
import { SendOTPController } from "interfaceAdpaters/controllers/auth/sent-otp-controller";
import { ForgotOtpController } from "interfaceAdpaters/controllers/client/forgot-password.sentOTP-controller";
import { ForgotPasswordController } from "interfaceAdpaters/controllers/client/forgot-password-controller";
import { RefreshTokenController } from "interfaceAdpaters/controllers/auth/refresh-token-controller";


// ======logger=========//
import { LoggerMiddleWare } from "interfaceAdpaters/middlewares/logger.middleware";
import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { ErrorMiddleware } from "interfaceAdpaters/middlewares/error.middleware";
import { GetAllUserController } from "interfaceAdpaters/controllers/admin/get-all-clients";
import { HandleToggleStatus } from "interfaceAdpaters/controllers/admin/handleToggleClientStatus";
// import { ForgotVendorUpdatePasswordUseCase } from "@usecases/vendor/forgotPasswordVendorUseCase";
import { VendorForgotPassword } from "interfaceAdpaters/controllers/vendor/VendorforgotPasswordController";
import { GetAllVendorsController } from "interfaceAdpaters/controllers/admin/get-all-vendors.controllers";
import { HandleToggleVendorStatus } from "interfaceAdpaters/controllers/admin/handleToggleVendorController";
import { ForgotVendorOTPController } from "interfaceAdpaters/controllers/vendor/forgot-password.vendorController";
import { LogoutController } from "interfaceAdpaters/controllers/auth/logout-controller";
import { BlockedStatusMiddleware } from "interfaceAdpaters/middlewares/block-status.middleware";
import { GoogleController } from "interfaceAdpaters/controllers/auth/google-login-controller";


DependencyInjection.registerAll()
export const blockstatusMiddleware = container.resolve(BlockedStatusMiddleware)

export const registerController = container.resolve(registerUserController);

export const loginController = container.resolve(loginUserController);

export const googleController = container.resolve(GoogleController)

export const logoutController = container.resolve(LogoutController)

export const verifyOtpController = container.resolve(VerifyOTPController)

export const sentOtpController = container.resolve(SendOTPController)
export const refreshTokenController = container.resolve(RefreshTokenController);

 export const forgotOtpController  = container.resolve(ForgotOtpController)
    
 export const forgotPasswordController = container.resolve(ForgotPasswordController);

 export const forgotVendorOTPController = container.resolve(ForgotVendorOTPController)
 
export const forgotVendorPasswordController = container.resolve(VendorForgotPassword)

 export const getAlluserscontroller = container.resolve(GetAllUserController)

 export const toggleUsercontroller = container.resolve(HandleToggleStatus);
 
export const toggleVendorController = container.resolve(HandleToggleVendorStatus)

 export const getAllVendorsController = container.resolve(GetAllVendorsController)
// logger  middleware//
export const injectedLoggerMiddleWare  = container.resolve<LoggerMiddleWare>(LoggerMiddleWare)
export const injectedLogger = container.resolve<ILogger>("ILogger")


// =========error handling middleware=========//
export const errorMiddleware = container.resolve<ErrorMiddleware>("ErrorMiddleware")