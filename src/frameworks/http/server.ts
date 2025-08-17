import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser"
import morgan from "morgan"
import express, { Application} from "express";
import { AuthRoutes } from "../../frameworks/routes/auth/auth.route";
import { ClientRoutes } from "@frameworks/routes/client/client.route";
import { config } from "@shared/config";
import { MongoConnect } from "@frameworks/database/Mongodb/mongoConnect";
import {  errorMiddleware } from "@frameworks/di/resolver";
import { AdminRotes } from "@frameworks/routes/admin/admin.route";
import { VendorRoutes } from "@frameworks/routes/vendor/vendor.route";
import { CloudinaryRoutes } from "@frameworks/routes/common/cloudinaryRoutes";
const connectDB = new MongoConnect()

export class ExpressServer {
  private _app: Application;

  constructor() {
    
    this._app = express();

    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this._app.use(helmet());
    this._app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
      })
    );
    this._app.use(
      cors({
        origin: config.cors.ALLOWED_ORIGIN,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
      })
    );

   

 

    this._app.use(express.json());
    this._app.use(express.urlencoded({extended:true}))
    this._app.use(cookieParser())
    this._app.use(morgan("dev"))
  }

  private configureRoutes(): void {
    console.log("✅ Mounting /api/auth route...");
    this._app.use("/api_v1/auth", new AuthRoutes().router);
    console.log("✅ Mounting /api/client route...");
    this._app.use("/api_v1/client",new ClientRoutes().router);
    
    this._app.use("/api_v1/admin",new AdminRotes().router);

  
    this._app.use("/api_v1/vendor",new VendorRoutes().router)
    this._app.use("/api/cloudinary",new CloudinaryRoutes().router)
    console.log("provider mounted successfully")
  }

  public configureErrorHandlingMiddleware ():void{
    this._app.use(errorMiddleware.handleError.bind(errorMiddleware))
  }

  public getApp(): Application {
  
    return this._app;
  }
  public listen(){
    this._app.listen(3000,()=>console.log('server listening'))
    connectDB.connectDB()
    this.configureErrorHandlingMiddleware()
  }

 
}

const app = new ExpressServer()
app.listen()