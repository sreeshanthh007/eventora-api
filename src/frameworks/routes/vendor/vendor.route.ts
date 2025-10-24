

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
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["vendor"]),
            clientController.updateProfileImage.bind(clientController)
        );

        this.router.patch(
            "/update-profile",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["vendor"]),
            vendoController.updatePersonalInformation.bind(vendoController)
        );

        this.router.patch(
            "/change-password",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["vendor"]),
            vendoController.changePassword.bind(vendoController)
        );
        this.router.patch(
            "/:vendorId/resend-verification",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(adminVendorController.resendVerification.bind(adminVendorController))
        );

        this.router.post(
            "/add-event",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.addEvent.bind(eventController))
        );

        this.router.post(
            "/add-service",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["vendor"]),
            asyncHandler(serviceController.addService.bind(serviceController))
        );

        this.router.get(
            "/get-category-service",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(categoryController.getCategoryForService.bind(categoryController))
        );

        this.router.patch(
            "/edit-service/:serviceId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(serviceController.editService.bind(serviceController))
        );


        this.router.get(
            "/get-services",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(serviceController.getAllService.bind(serviceController))
        );
        
        this.router.get(
            "/service-by-id/:serviceId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(serviceController.getServiceById.bind(serviceController))
        );
        
        this.router.patch(
            "/toggle-service/:serviceId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(serviceController.toggleServiceStatus.bind(serviceController))
        );


        this.router.get(
            "/vendor-notification",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.getVendorNotification.bind(vendoController))
        )

        this.router.post(
            "/add-work-sample",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.addWorkSample.bind(vendoController))
        );

        this.router.get(
            "/get-work-sample-details",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.getWorkSampleData.bind(vendoController))
        );

        this.router.patch(
            "/edit-work-sample/:workSampleId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.editWorkSample.bind(vendoController))
        );
        
        
        this.router.get(
            "/get-all-events",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.getAllEvents.bind(eventController))
        );

        this.router.patch(
            "/edit-events/:eventId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.updateEvent.bind(eventController))
        );

        this.router.get(
            "/get-events-by-id/:eventId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.getEventById.bind(eventController))
        );

        this.router.patch(
            "/update-event-status/:eventId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.updateEventStatus.bind(eventController))
        );

        this.router.post(
            "/scan-event",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.scanAndVerifyAttendies.bind(vendoController))
        );

        this.router.post(
            "/scan-ticket",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.scanAndVerifyTickets.bind(vendoController))
        );

        this.router.patch(
            "/toggle-status/:eventId",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(eventController.toggeleStatus.bind(eventController))
        );

        this.router.get(
            "/wallet-details",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.getVendorwalletDetails.bind(vendoController))
        );

        this.router.get(
            "/get-ticket-details",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.getTicketDetails.bind(vendoController))   
        );
        
        this.router.get(
            "/get-booked-services",
            verifyAuth,
            authorizeRole(["vendor"]),
            asyncHandler(vendoController.getBookedServices.bind(vendoController))
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