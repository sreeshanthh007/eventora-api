"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRotes = void 0;
const async_handler_1 = require("@shared/async-handler");
const base_route_1 = require("../base.route");
const auth_middleware_1 = require("interfaceAdpaters/middlewares/auth.middleware");
const resolver_1 = require("@frameworks/di/resolver");
class AdminRotes extends base_route_1.BaseRouter {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get("/users", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.getAlluserscontroller.handle.bind(resolver_1.getAlluserscontroller)));
        this.router.get("/vendors", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.getAllVendorsController.handle.bind(resolver_1.getAllVendorsController)));
        this.router.patch("/user-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.toggleUsercontroller.handle.bind(resolver_1.toggleUsercontroller)));
        this.router.patch("/vendor-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.toggleVendorController.handle.bind(resolver_1.toggleVendorController)));
        this.router.post("/refresh-token", auth_middleware_1.decodeToken, (0, async_handler_1.asyncHandler)(resolver_1.refreshTokenController.handle.bind(resolver_1.refreshTokenController)));
    }
}
exports.AdminRotes = AdminRotes;
