"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const chalk_1 = __importDefault(require("chalk"));
const http_1 = require("http");
const config_1 = require("@shared/config");
const server_1 = require("@frameworks/http/server");
const mongoConnect_1 = require("@frameworks/database/Mongodb/mongoConnect");
const socket_server_1 = require("interfaceAdpaters/websockets/socket-server");
const mongoConnect = new mongoConnect_1.MongoConnect();
const expressServer = new server_1.ExpressServer();
const httpServer = (0, http_1.createServer)(expressServer.getApp());
new socket_server_1.SocketServer(httpServer);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoConnect.connectDB();
            httpServer.listen(config_1.config.server.PORT, () => {
                console.log(chalk_1.default.cyanBright.bold("\n🚀 Server Status"));
                console.log(chalk_1.default.greenBright("--------------------------------------------------"));
                console.log(chalk_1.default.yellowBright.bold(`✅ Server is running at ${chalk_1.default.blueBright(`http://localhost:${config_1.config.server.PORT}`)}`));
                console.log(chalk_1.default.greenBright("--------------------------------------------------\n"));
            });
        }
        catch (error) {
            console.error(chalk_1.default.redBright("❌ Failed to start server:"), error);
            process.exit(1);
        }
    });
}
startServer();
