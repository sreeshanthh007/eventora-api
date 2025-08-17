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
        this.router.get("/requested-vendors", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.getAllRequestedVendorsController.handle.bind(resolver_1.getAllRequestedVendorsController)));
        this.router.patch("/approve-vendors", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.approveVendorController.handle.bind(resolver_1.approveVendorController)));
        this.router.patch("/reject-vendors", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.rejectVendorController.handle.bind(resolver_1.rejectVendorController)));
        this.router.patch("/user-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.toggleUsercontroller.handle.bind(resolver_1.toggleUsercontroller)));
        this.router.patch("/vendor-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.toggleVendorController.handle.bind(resolver_1.toggleVendorController)));
        this.router.patch("/category-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.toggleCategoryController.handle.bind(resolver_1.toggleCategoryController)));
        this.router.get("/categories", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.getAllcategorycontroller.handle.bind(resolver_1.getAllcategorycontroller)));
        this.router.post("/refresh-token", auth_middleware_1.decodeToken, (0, async_handler_1.asyncHandler)(resolver_1.refreshTokenController.handle.bind(resolver_1.refreshTokenController)));
        this.router.post("/add-category", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.addCategoryController.handle.bind(resolver_1.addCategoryController)));
        this.router.post("/logout", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), resolver_1.logoutController.handle.bind(resolver_1.logoutController));
    }
}
exports.AdminRotes = AdminRotes;
