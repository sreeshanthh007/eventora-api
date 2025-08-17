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
        this.router.post("/signup", (0, async_handler_1.asyncHandler)(resolver_1.registerController.handle.bind(resolver_1.registerController)));
        this.router.post("/login", (0, async_handler_1.asyncHandler)(resolver_1.loginController.handle.bind(resolver_1.loginController)));
        this.router.post("/sent-otp", (0, async_handler_1.asyncHandler)(resolver_1.sentOtpController.handle.bind(resolver_1.sentOtpController)));
        this.router.post("/forgot-password/sent-otp", (0, async_handler_1.asyncHandler)(resolver_1.forgotOtpController.handle.bind(resolver_1.forgotOtpController)));
        this.router.post("/verify-otp", (0, async_handler_1.asyncHandler)(resolver_1.verifyOtpController.handle.bind(resolver_1.verifyOtpController)));
        this.router.post("/google-auth", (0, async_handler_1.asyncHandler)(resolver_1.googleController.handle.bind(resolver_1.googleController)));
    }
}
exports.AuthRoutes = AuthRoutes;
