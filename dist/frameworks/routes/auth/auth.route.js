"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const async_handler_1 = require("@shared/async-handler");
const base_route_1 = require("../base.route");
const resolver_1 = require("@frameworks/di/resolver");
class AuthRoutes extends base_route_1.BaseRouter {
    constructor() {
        super();
        console.log("🔧 AuthRoutes constructor called");
    }
    initializeRoutes() {
        console.log("✅ initializeRoutes() running...");
        this.router.post("/signup", (0, async_handler_1.asyncHandler)(resolver_1.authController.register.bind(resolver_1.authController)));
        this.router.post("/login", (0, async_handler_1.asyncHandler)(resolver_1.authController.login.bind(resolver_1.authController)));
        this.router.post("/sent-otp", (0, async_handler_1.asyncHandler)(resolver_1.authController.sentOtpEmail.bind(resolver_1.authController)));
        this.router.put("/forgot-password", (0, async_handler_1.asyncHandler)(resolver_1.forgotPasswordController.handle.bind(resolver_1.forgotPasswordController)));
        this.router.post("/forgot-password/sent-otp", (0, async_handler_1.asyncHandler)(resolver_1.forgotOtpController.handle.bind(resolver_1.forgotOtpController)));
        this.router.post("/verify-otp", (0, async_handler_1.asyncHandler)(resolver_1.authController.verifyOtp.bind(resolver_1.authController)));
        this.router.post("/google-auth", (0, async_handler_1.asyncHandler)(resolver_1.authController.authenticatedWithGoogle.bind(resolver_1.authController)));
        this.router.post("/save-fcm", (0, async_handler_1.asyncHandler)(resolver_1.authController.saveFcmToken.bind(resolver_1.authController)));
    }
}
exports.AuthRoutes = AuthRoutes;
