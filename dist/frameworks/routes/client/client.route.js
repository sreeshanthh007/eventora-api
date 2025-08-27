"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const async_handler_1 = require("@shared/async-handler");
const base_route_1 = require("../base.route");
const resolver_1 = require("@frameworks/di/resolver");
const auth_middleware_1 = require("interfaceAdpaters/middlewares/auth.middleware");
class ClientRoutes extends base_route_1.BaseRouter {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.post("/refresh-token", auth_middleware_1.decodeToken, (0, async_handler_1.asyncHandler)(resolver_1.authController.handleTokenRefresh.bind(resolver_1.authController)));
        this.router.get("/all-categories", (0, async_handler_1.asyncHandler)(resolver_1.fetchCategoryController.getAllCategories.bind(resolver_1.fetchCategoryController)));
        this.router.get("/all-events", (0, async_handler_1.asyncHandler)(resolver_1.clientController.getAllEvents.bind(resolver_1.clientController)));
        this.router.get("/refresh-session", auth_middleware_1.verifyAuth, (0, auth_middleware_1.authorizeRole)(["client"]), resolver_1.blockstatusMiddleware.checkBlockedStatus, (0, async_handler_1.asyncHandler)(resolver_1.clientController.refreshSession.bind(resolver_1.clientController)));
        this.router.post("/update-profileImage", auth_middleware_1.verifyAuth, resolver_1.blockstatusMiddleware.checkBlockedStatus, (0, auth_middleware_1.authorizeRole)(["client"]), (0, async_handler_1.asyncHandler)(resolver_1.clientController.updateProfileImage.bind(resolver_1.clientController)));
        this.router.patch("/update-profile", auth_middleware_1.verifyAuth, resolver_1.blockstatusMiddleware.checkBlockedStatus, (0, auth_middleware_1.authorizeRole)(["client"]), (0, async_handler_1.asyncHandler)(resolver_1.clientController.updateProfileInformation.bind(resolver_1.clientController)));
        this.router.post("/logout", auth_middleware_1.verifyAuth, (0, async_handler_1.asyncHandler)(resolver_1.authController.logout.bind(resolver_1.authController)));
    }
}
exports.ClientRoutes = ClientRoutes;
