import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authController,blockstatusMiddleware,chatController,clientController, clientRatingController, eventBookingController } from "@frameworks/di/resolver";
import { authorizeRole, decodeToken , verifyAuth} from "interfaceAdpaters/middlewares/auth.middleware";
import { RequestHandler } from "express";

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
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getAllEventsWithFilters.bind(clientController))
        );

        this.router.get(
            "/servicePage",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getAllServiceWithFilters.bind(clientController))
        );

        this.router.get(
            "/client-notification",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getAllNotifications.bind(clientController))
        );

        this.router.get(
            "/get-category-for-filter",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getCategoriesForFilter.bind(clientController))
        );

        this.router.get(
            "/event-details/:eventId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getEventDetails.bind(clientController))
        );

        this.router.get(
            "/workfolio/:vendorId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getVendorWorkfolioForClient.bind(clientController))
        );

        this.router.get(
            "/service-details/:serviceId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getServiceDetails.bind(clientController))
        );

        this.router.get(
            "/services-by-vendors/:vendorId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getServicesProvidedByVendors.bind(clientController))
        )


        this.router.get(
            "/booked-events",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getEventBooking.bind(clientController))
        );

        this.router.patch(
            "/cancel-ticket/:ticketId/:eventId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.cancelTickets.bind(clientController))
        );

        this.router.patch(
            "/cancel-service/:serviceId/:vendorId/:bookingId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.cancelService.bind(clientController))
        );

        this.router.get(
            "/ratings/:serviceId",
            verifyAuth,
            authorizeRole(["client"]),
            asyncHandler(clientRatingController.getAllRatingsWithAverage.bind(clientRatingController))

        );

        this.router.post(
            "/add-rating",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientRatingController.addReview.bind(clientRatingController))
        );

        this.router.patch(
            "/edit-rating/:ratingId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientRatingController.editReview.bind(clientRatingController))
        );

        this.router.delete(
            "/delete-rating/:reviewId",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientRatingController.removeReview.bind(clientRatingController))
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


        this.router.patch(
            "/change-password",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["client"]),
            asyncHandler(clientController.changePassword.bind(clientController))
        )
        this.router.post(
            "/create-booking",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["client"]),
            asyncHandler(eventBookingController.createBooking.bind(eventBookingController))
        ); 

        this.router.post(
            "/create-service-booking",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["client"]),
            asyncHandler(clientController.bookService.bind(clientController))
        );

        this.router.get(
            "/wallet-details",
            verifyAuth,
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            authorizeRole(["client"]),
            asyncHandler(clientController.getClientWalletDetails.bind(clientController))
            
        );

        this.router.get(
            "/booked-services",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.getBookedServices.bind(clientController))
        );


        this.router.get(
            "/client/chat",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(chatController.getChatbyChatId.bind(chatController))
        );


        this.router.get(
            "/client/chats",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(chatController.getAllChatsByUserId.bind(chatController))
        )

        this.router.post("/logout",
            verifyAuth,
            authorizeRole(["client"]),
            asyncHandler(authController.logout.bind(authController))
        )
    }
}   