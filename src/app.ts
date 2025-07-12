import "reflect-metadata";
import "module-alias/register"

import chalk from "chalk";
import { config } from "@shared/config";
import { ExpressServer } from "@frameworks/http/server";
import { MongoConnect } from "@frameworks/database/Mongodb/mongoConnect";
import { createServer } from "http";


 // frameworks/http/server.ts
const expressServer = new ExpressServer()
const mongoConnect = new MongoConnect()


mongoConnect.connectDB()

const httpServer = createServer(expressServer.getApp())

httpServer.listen(config.server.PORT, () => {
	console.log(chalk.cyanBright.bold("\n🚀 Server Status"));
	console.log(chalk.greenBright("--------------------------------------------------"));
	console.log(
		chalk.yellowBright.bold(
			`✅ Server is running at ${chalk.blueBright(
				`http://localhost:${config.server.PORT}`
			)}`
		)
	)


	console.log(chalk.greenBright("--------------------------------------------------\n"));
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
