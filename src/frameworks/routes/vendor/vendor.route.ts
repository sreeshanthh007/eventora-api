

import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authController, blockstatusMiddleware, clientController,eventController, forgotVendorOTPController, adminVendorController, vendoController, serviceController, categoryController } from "@frameworks/di/resolver";
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
        
        this.router.post(
            "/update-profileImage",
            verifyAuth,
            authorizeRole(["vendor"]),
            clientController.updateProfileImage.bind(clientController)
        );

        this.router.patch(
            "/update-profile",
            verifyAuth,
            authorizeRole(["vendor"]),
            vendoController.updatePersonalInformation.bind(vendoController)
        )
        this.router.patch(
            "/:vendorId/resend-verification",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(adminVendorController.resendVerification.bind(adminVendorController))
        );

        this.router.post(
            "/add-event",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.addEvent.bind(eventController))
        );

        this.router.post(
            "/add-service",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(serviceController.addService.bind(serviceController))
        );

        // this.router.get(
        //     "/get-category-service",
        //     verifyAuth,
        //     authorizeRole(["vendor"]),
        //     asyncHandler(categoryController.getCategoryForService.bind(categoryController))
        // );

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