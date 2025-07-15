

import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { forgotVendorOTPController, forgotVendorPasswordController } from "@frameworks/di/resolver";
 

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

        
    }
}