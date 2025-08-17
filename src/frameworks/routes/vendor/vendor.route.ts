

import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authController, editVendorProfileController, forgotVendorOTPController } from "@frameworks/di/resolver";
import { authorizeRole, decodeToken, verifyAuth } from "interfaceAdpaters/middlewares/auth.middleware";
 

export class VendorRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post(
            "/vendorForgot/sent-otp",
            asyncHandler(forgotVendorOTPController.handle.bind(forgotVendorOTPController))
        );


        this.router.put(
            "/update-profile",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(editVendorProfileController.handle.bind(editVendorProfileController))
        );


        
        
        this.router.post(
            "/logout",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(authController.logout.bind(authController))
        );

        this.router.post("/refresh-token",decodeToken,asyncHandler(authController.handleTokenRefresh.bind(authController)))
        
    }
}   