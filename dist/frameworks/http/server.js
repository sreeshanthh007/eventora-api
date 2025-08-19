"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
require("reflect-metadata");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../../frameworks/routes/auth/auth.route");
const client_route_1 = require("@frameworks/routes/client/client.route");
const config_1 = require("@shared/config");
const resolver_1 = require("@frameworks/di/resolver");
const admin_route_1 = require("@frameworks/routes/admin/admin.route");
const vendor_route_1 = require("@frameworks/routes/vendor/vendor.route");
const cloudinaryRoutes_1 = require("@frameworks/routes/common/cloudinaryRoutes");
class ExpressServer {
    constructor() {
        this._app = (0, express_1.default)();
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandlingMiddleware();
    }
    configureMiddlewares() {
        this._app.use((0, helmet_1.default)());
        this._app.use((0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000,
            max: 1000,
        }));
        this._app.use((0, cors_1.default)({
            origin: config_1.config.cors.ALLOWED_ORIGIN,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Authorization", "Content-Type"],
            credentials: true,
        }));
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.use((0, cookie_parser_1.default)());
        this._app.use((0, morgan_1.default)("dev"));
    }
    configureRoutes() {
        console.log("✅ Mounting /api/auth route...");
        this._app.use("/api_v1/auth", new auth_route_1.AuthRoutes().router);
        console.log("✅ Mounting /api/client route...");
        this._app.use("/api_v1/client", new client_route_1.ClientRoutes().router);
        this._app.use("/api_v1/admin", new admin_route_1.AdminRotes().router);
        this._app.use("/api_v1/vendor", new vendor_route_1.VendorRoutes().router);
        this._app.use("/api/cloudinary", new cloudinaryRoutes_1.CloudinaryRoutes().router);
        console.log("Routes mounted successfully");
    }
    configureErrorHandlingMiddleware() {
        this._app.use(resolver_1.errorMiddleware.handleError.bind(resolver_1.errorMiddleware));
    }
    getApp() {
        return this._app;
    }
}
exports.ExpressServer = ExpressServer;
