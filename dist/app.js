"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const chalk_1 = __importDefault(require("chalk"));
const config_1 = require("@shared/config");
const server_1 = require("@frameworks/http/server");
const mongoConnect_1 = require("@frameworks/database/Mongodb/mongoConnect");
const http_1 = require("http");
// frameworks/http/server.ts
const expressServer = new server_1.ExpressServer();
const mongoConnect = new mongoConnect_1.MongoConnect();
mongoConnect.connectDB();
const httpServer = (0, http_1.createServer)(expressServer.getApp());
httpServer.listen(config_1.config.server.PORT, () => {
    console.log(chalk_1.default.cyanBright.bold("\n🚀 Server Status"));
    console.log(chalk_1.default.greenBright("--------------------------------------------------"));
    console.log(chalk_1.default.yellowBright.bold(`✅ Server is running at ${chalk_1.default.blueBright(`http://localhost:${config_1.config.server.PORT}`)}`));
    console.log(chalk_1.default.greenBright("--------------------------------------------------\n"));
});
// import chalk from "chalk";
// import { config } from "@shared/config";
// import { ExpressServer } from "@frameworks/http/server";
// import { MongoConnect } from "@frameworks/database/Mongodb/mongoConnect";
// // ✅ Create server & DB connection
// const expressServer = new ExpressServer();
// const mongoConnect = new MongoConnect();
// mongoConnect.connectDB();
// // ✅ Use the already-created server
// const httpServer = 
// expressServer.getApp().listen(3000,()=>console.log('sdjfhs'))
// httpServer.listen(3000,()=>console.log('server ruasdfasjfnning'))
// httpServer.listen(config.server.PORT, () => {
//   console.log(chalk.cyanBright.bold("\n🚀 Server Status"));
//   console.log(chalk.greenBright("--------------------------------------------------"));
//   console.log(
//     chalk.yellowBright.bold(
//       `✅ Server is running at ${chalk.blueBright(
//         `http://localhost:${config.server.PORT}`
//       )}`
//     )
//   );
//   console.log(chalk.greenBright("--------------------------------------------------\n"));
// });
