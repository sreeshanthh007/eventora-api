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
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../../frameworks/routes/auth/auth.route");
const config_1 = require("@shared/config");
const mongoConnect_1 = require("@frameworks/database/Mongodb/mongoConnect");
const connectDB = new mongoConnect_1.MongoConnect();
class ExpressServer {
    constructor() {
        this._app = (0, express_1.default)();
        this.configureMiddlewares();
        this.configureRoutes();
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
    }
    configureRoutes() {
        console.log("✅ Mounting /api/auth route...");
        this._app.use("/api/auth", new auth_route_1.AuthRoutes().router);
    }
    getApp() {
        // console.log('jashdfjaslkdf')
        return this._app;
    }
    listen() {
        this._app.listen(3000, () => console.log('server listening'));
        connectDB.connectDB();
    }
}
exports.ExpressServer = ExpressServer;
const app = new ExpressServer();
app.listen();
