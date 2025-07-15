
  import { asyncHandler } from "@shared/async-handler";
  import { BaseRouter } from "../base.route";
  import { loginController , registerController ,verifyOtpController , sentOtpController , 
    forgotOtpController
  } from "@frameworks/di/resolver";

  export class AuthRoutes extends BaseRouter{
      constructor(){
          super()
           console.log("🔧 AuthRoutes constructor called");
      }
    

    protected initializeRoutes(): void {
       console.log("✅ initializeRoutes() running...");
      this.router.post("/signup", asyncHandler(registerController.handle.bind(registerController)));
      this.router.post("/login", asyncHandler(loginController.handle.bind(loginController)));
      this.router.post("/sent-otp", asyncHandler(sentOtpController.handle.bind(sentOtpController)));
      this.router.post("/forgot-password/sent-otp",asyncHandler(forgotOtpController.handle.bind(forgotOtpController)))
      this.router.post("/verify-otp", asyncHandler(verifyOtpController.handle.bind(verifyOtpController)));
    }
  }