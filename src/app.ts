import "reflect-metadata";
import "module-alias/register";
import chalk from "chalk";
import { createServer } from "http";
import { config } from "@shared/config";
import { ExpressServer } from "@frameworks/http/server";
import { MongoConnect } from "@frameworks/database/Mongodb/mongoConnect";
import { SocketServer } from "interfaceAdpaters/websockets/socket-server";


const mongoConnect = new MongoConnect();


const expressServer = new ExpressServer();



const httpServer = createServer(expressServer.getApp());

const socketServer = new SocketServer(httpServer)

async function startServer() {
  try {
   
    await mongoConnect.connectDB();
    
   
    httpServer.listen(config.server.PORT, () => {
      console.log(chalk.cyanBright.bold("\n🚀 Server Status"));
      console.log(chalk.greenBright("--------------------------------------------------"));
      console.log(
        chalk.yellowBright.bold(
          `✅ Server is running at ${chalk.blueBright(
            `http://localhost:${config.server.PORT}`
          )}`
        )
      );
      console.log(chalk.greenBright("--------------------------------------------------\n"));
    });
  } catch (error) {
    console.error(chalk.redBright("❌ Failed to start server:"), error);
    process.exit(1);
  }
}

startServer();
