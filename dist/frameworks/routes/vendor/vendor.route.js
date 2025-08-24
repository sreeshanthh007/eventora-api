"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoutes = void 0;
const async_handler_1 = require("@shared/async-handler");
const base_route_1 = require("../base.route");
const resolver_1 = require("@frameworks/di/resolver");
const auth_middleware_1 = require("interfaceAdpaters/middlewares/auth.middleware");
class VendorRoutes extends base_route_1.BaseRouter {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get("/refresh_session", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), resolver_1.blockstatusMiddleware.checkBlockedStatus, (0, async_handler_1.asyncHandler)(resolver_1.authController.refreshSession.bind(resolver_1.authController)));
        this.router.post("/vendorForgot/sent-otp", (0, async_handler_1.asyncHandler)(resolver_1.forgotVendorOTPController.handle.bind(resolver_1.forgotVendorOTPController)));
        this.router.post("/update-profileImage", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), resolver_1.clientController.updateProfileImage.bind(resolver_1.clientController));
        this.router.patch("/update-profile", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), resolver_1.vendoController.updatePersonalInformation.bind(resolver_1.vendoController));
        this.router.patch("/:vendorId/resend-verification", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), (0, async_handler_1.asyncHandler)(resolver_1.adminVendorController.resendVerification.bind(resolver_1.adminVendorController)));
        this.router.post("/add-event", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), (0, async_handler_1.asyncHandler)(resolver_1.eventController.addEvent.bind(resolver_1.eventController)));
        this.router.post("/add-service", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), (0, async_handler_1.asyncHandler)(resolver_1.serviceController.addService.bind(resolver_1.serviceController)));
        // this.router.get(
        //     "/get-category-service",
        //     verifyAuth,
        //     authorizeRole(["vendor"]),
        //     asyncHandler(categoryController.getCategoryForService.bind(categoryController))
        // );
        this.router.post("/get-all-events", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), (0, async_handler_1.asyncHandler)(resolver_1.eventController.getAllEvents.bind(resolver_1.eventController)));
        this.router.patch("/toggle-status", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), (0, async_handler_1.asyncHandler)(resolver_1.eventController.toggeleStatus.bind(resolver_1.eventController)));
        this.router.post("/logout", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["vendor"]), (0, async_handler_1.asyncHandler)(resolver_1.authController.logout.bind(resolver_1.authController)));
        this.router.post("/refresh-token", auth_middleware_1.decodeToken, (0, async_handler_1.asyncHandler)(resolver_1.authController.handleTokenRefresh.bind(resolver_1.authController)));
    }
}
exports.VendorRoutes = VendorRoutes;
