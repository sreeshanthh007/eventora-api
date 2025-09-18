import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authController,blockstatusMiddleware,clientController, eventBookingController, vendoController } from "@frameworks/di/resolver";
import { authorizeRole, decodeToken , verifyAuth} from "interfaceAdpaters/middlewares/auth.middleware";
import { RequestHandler } from "express";
import express from "express"

export class ClientRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/refresh-token",decodeToken,asyncHandler(authController.handleTokenRefresh.bind(authController)))
     

        this.router.get(
            "/all-categories",
            asyncHandler(clientController.getAllCategories.bind(clientController))
        );

        this.router.get(
            "/all-events",
            asyncHandler(clientController.getAllEvents.bind(clientController))
        );

        this.router.get(
            "/eventPage",
            asyncHandler(clientController.getAllEventsWithFilters.bind(clientController))
        );

        this.router.get(
            "/servicePage",
            asyncHandler(clientController.getAllServiceWithFilters.bind(clientController))
        );

        this.router.get(
            "/event-details/:eventId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getEventDetails.bind(clientController))
        );


        this.router.get(
            "/service-details/:serviceId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getServiceDetails.bind(clientController))
        );


        this.router.get(
            "/refresh-session",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.refreshSession.bind(clientController))
        );


        this.router.post(
            "/update-profileImage",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["client"]),
            asyncHandler(clientController.updateProfileImage.bind(clientController))
        );

        this.router.patch(
            "/update-profile",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["client"]),
            asyncHandler(clientController.updateProfileInformation.bind(clientController))
        );

        this.router.post(
            "/create-booking",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["client"]),
            asyncHandler(eventBookingController.createBooking.bind(eventBookingController))
        );  


        this.router.get(
            "/details/:vendorId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(vendoController.getVendorDetails.bind(vendoController))
        );
        
       

        this.router.post("/logout",verifyAuth,authorizeRole(["client"]),asyncHandler(authController.logout.bind(authController)))
    }
}   