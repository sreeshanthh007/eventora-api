"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryRoutes = void 0;
const base_route_1 = require("../base.route");
const resolver_1 = require("@frameworks/di/resolver");
class CloudinaryRoutes extends base_route_1.BaseRouter {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get("/signature", resolver_1.authController.getUploadSignature.bind(resolver_1.authController));
    }
}
exports.CloudinaryRoutes = CloudinaryRoutes;
