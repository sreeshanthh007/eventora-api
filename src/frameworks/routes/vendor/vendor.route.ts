

import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authController, blockstatusMiddleware, editVendorProfileController,eventController, forgotVendorOTPController, vendorController } from "@frameworks/di/resolver";
import { authorizeRole, decodeToken, verifyAuth } from "interfaceAdpaters/middlewares/auth.middleware";
import { RequestHandler } from "express";
 

export class VendorRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {

        this.router.get(
            "/refresh_session",
           verifyAuth,
           authorizeRole(["vendor"]),
           blockstatusMiddleware.checkBlockedStatus as RequestHandler,
           asyncHandler(authController.refreshSession.bind(authController))
        );
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


        this.router.patch(
            "/:vendorId/resend-verification",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendorController.resendVerification.bind(vendorController))
        );




        this.router.post(
            "/add-event",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.addEvent.bind(eventController))
        );

        this.router.post(
            "/get-all-events",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.getAllEvents.bind(eventController))
        );


        this.router.patch(
            "/toggle-status",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.toggeleStatus.bind(eventController))
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