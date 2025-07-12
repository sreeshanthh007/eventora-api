import { container } from "tsyringe";

import { registerUserController } from "interfaceAdpaters/controllers/auth/register-controller";
import { loginUserController } from "interfaceAdpaters/controllers/auth/login-controller";
import { VerifyOTPController } from "interfaceAdpaters/controllers/auth/verifyOtp-controller";
import { SendOTPController } from "interfaceAdpaters/controllers/auth/sent-otp-controller";
import { RefreshTokenController } from "interfaceAdpaters/controllers/auth/refresh-token-controller";

export class ControllerRegistry {
    static registerControllers():void{
        container.register("RegisterUsercontroller",{
            useClass:registerUserController
        });

        container.register("loginUserController",{
            useClass:loginUserController
        });

        container.register("VerifyOTPController",{
            useClass:VerifyOTPController
        });

        container.register("SendOTPController",{
            useClass:SendOTPController
        });

        container.register("RefreshTokenController",{
            useClass:RefreshTokenController
        })
    }
}