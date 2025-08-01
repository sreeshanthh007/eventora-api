

import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { forgotVendorOTPController, forgotVendorPasswordController, logoutController, refreshTokenController } from "@frameworks/di/resolver";
import { authorizeRole, decodeToken, verifyAuth } from "interfaceAdpaters/middlewares/auth.middleware";
 

export class VendorRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {

        
        this.router.put(
            "/forgot-vendor_password",
            asyncHandler(forgotVendorPasswordController.handle.bind(forgotVendorPasswordController))
        );
        
        this.router.post(
            "/vendorForgot/sent-otp",
            asyncHandler(forgotVendorOTPController.handle.bind(forgotVendorOTPController))
        )
        
        this.router.post(
            "/logout",
            verifyAuth,
            authorizeRole(["vendor"]),
            logoutController.handle.bind(logoutController)
        );

        this.router.post("/refresh-token",decodeToken,asyncHandler(refreshTokenController.handle.bind(refreshTokenController)))
        
    }
}   