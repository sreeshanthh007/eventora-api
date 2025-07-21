"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoutes = void 0;
const async_handler_1 = require("@shared/async-handler");
const base_route_1 = require("../base.route");
const resolver_1 = require("@frameworks/di/resolver");
class VendorRoutes extends base_route_1.BaseRouter {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.put("/forgot-vendor_password", (0, async_handler_1.asyncHandler)(resolver_1.forgotVendorPasswordController.handle.bind(resolver_1.forgotVendorPasswordController)));
        this.router.post("/vendorForgot/sent-otp", (0, async_handler_1.asyncHandler)(resolver_1.forgotVendorOTPController.handle.bind(resolver_1.forgotVendorOTPController)));
    }
}
exports.VendorRoutes = VendorRoutes;
