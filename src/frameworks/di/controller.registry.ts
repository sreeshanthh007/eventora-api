import { container } from "tsyringe";

import { registerUserController } from "interfaceAdpaters/controllers/auth/register-controller";
import { loginUserController } from "interfaceAdpaters/controllers/auth/login-controller";
import { VerifyOTPController } from "interfaceAdpaters/controllers/auth/verifyOtp-controller";
import { SendOTPController } from "interfaceAdpaters/controllers/auth/sent-otp-controller";
import { ForgotOtpController } from "interfaceAdpaters/controllers/client/forgot-password.sentOTP-controller";
import { RefreshTokenController } from "interfaceAdpaters/controllers/auth/refresh-token-controller";
import { ForgotPasswordController } from "interfaceAdpaters/controllers/client/forgot-password-controller";
import { forgotVendorPasswordController } from "./resolver";
import { ForgotVendorOTPController } from "interfaceAdpaters/controllers/vendor/forgot-password.vendorController";
import { LogoutController } from "interfaceAdpaters/controllers/auth/logout-controller";
import { GoogleController } from "interfaceAdpaters/controllers/auth/google-login-controller";

export class ControllerRegistry {
    static registerControllers():void{
        container.register("RegisterUsercontroller",{
            useClass:registerUserController
        });

        container.register("loginUserController",{
            useClass:loginUserController
        });

        container.register("logoutController",{
            useClass:LogoutController
        })

        container.register("VerifyOTPController",{
            useClass:VerifyOTPController
        });

        container.register("SendOTPController",{
            useClass:SendOTPController
        });

        container.register("RefreshTokenController",{
            useClass:RefreshTokenController
        });

        container.register("ForgototpController",{
            useClass:ForgotOtpController
        });

        container.register("ForgotVendorOTPController",{
            useClass:ForgotVendorOTPController
        })

        // container.register("ForgotPasswordController",{
        //     useClass:ForgotPasswordController
        // })
        container.register("ForgotPasswordController",{
            useClass:ForgotPasswordController
        })

        container.register("GoogleLoginController",{
            useClass:GoogleController
        })
    }
}   