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
  import { errorMiddleware, eventBookingController, serviceAutoCompleteCron, serviceNotificationCron } from "@frameworks/di/resolver";
  import { AdminRotes } from "@frameworks/routes/admin/admin.route";
  import { VendorRoutes } from "@frameworks/routes/vendor/vendor.route";
  import { CommonRoutes } from "@frameworks/routes/common/commonRoutes";
  import { asyncHandler } from "@shared/async-handler";



  export class ExpressServer {
    private _app: Application;

    constructor() {
      this._app = express();
      this.configureMiddlewares();
      this.configureRoutes();
      this.configureErrorHandlingMiddleware();
      this.configureCronJobs()
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

      this._app.post("/api/webhook/stripe", 
        express.raw({type:"application/json"}),
        asyncHandler(eventBookingController.handleWebHook.bind(eventBookingController))
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
      this._app.use("/api_v1/_cl", new ClientRoutes().router);
      
      this._app.use("/api_v1/_ad", new AdminRotes().router);
      this._app.use("/api_v1/_ve", new VendorRoutes().router);
      this._app.use("/api",new CommonRoutes().router);

      console.log("Routes mounted successfully")
    }

    private configureErrorHandlingMiddleware(): void {
      this._app.use(errorMiddleware.handleError.bind(errorMiddleware))
    }

    private configureCronJobs() : void{
      serviceNotificationCron.start()
      serviceAutoCompleteCron.start()
    }

    public getApp(): Application {
      return this._app;
    }
  }