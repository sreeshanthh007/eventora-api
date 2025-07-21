"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const async_handler_1 = require("@shared/async-handler");
const base_route_1 = require("../base.route");
const resolver_1 = require("@frameworks/di/resolver");
const auth_middleware_1 = require("interfaceAdpaters/middlewares/auth.middleware");
const resolver_2 = require("@frameworks/di/resolver");
class ClientRoutes extends base_route_1.BaseRouter {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.post("/refresh-token", auth_middleware_1.decodeToken, (0, async_handler_1.asyncHandler)(resolver_1.refreshTokenController.handle.bind(resolver_1.refreshTokenController)));
        this.router.put("/forgot-password", (0, async_handler_1.asyncHandler)(resolver_2.forgotPasswordController.handle.bind(resolver_2.forgotPasswordController)));
    }
}
exports.ClientRoutes = ClientRoutes;
