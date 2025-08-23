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
        this.router.get("/users", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.adminClientController.getAllClients.bind(resolver_1.adminClientController)));
        this.router.get("/vendors", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.vendorController.getAllVendors.bind(resolver_1.vendorController)));
        this.router.get("/requested-vendors", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.vendorController.getRequestedVendors.bind(resolver_1.vendorController)));
        this.router.patch("/:vendorId/approve-vendors", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.vendorController.approveVendor.bind(resolver_1.vendorController)));
        this.router.patch("/:vendorId/reject-vendors", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.vendorController.rejectVendor.bind(resolver_1.vendorController)));
        this.router.patch("/user-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.adminClientController.updateClientAccountStatus.bind(resolver_1.adminClientController)));
        this.router.patch("/vendor-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.vendorController.udpateVendorAccountStatus.bind(resolver_1.vendorController)));
        this.router.patch("/category-status", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.categoryController.toogleCategory.bind(resolver_1.categoryController)));
        this.router.get("/categories", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.categoryController.getAllCategory.bind(resolver_1.categoryController)));
        this.router.post("/refresh-token", auth_middleware_1.decodeToken, (0, async_handler_1.asyncHandler)(resolver_1.authController.handleTokenRefresh.bind(resolver_1.authController)));
        this.router.post("/add-category", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.categoryController.addCategory.bind(resolver_1.categoryController)));
        this.router.post("/logout", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["admin"]), (0, async_handler_1.asyncHandler)(resolver_1.authController.logout.bind(resolver_1.authController)));
    }
}
exports.AdminRotes = AdminRotes;
