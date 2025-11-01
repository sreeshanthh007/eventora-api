
  import { asyncHandler } from "@shared/async-handler";
  import { BaseRouter } from "../base.route";
  import { 
    forgotOtpController,
    forgotPasswordController,
    authController,
  } from "@frameworks/di/resolver";

  export class AuthRoutes extends BaseRouter{
      constructor(){
          super()
      }
    

    protected initializeRoutes(): void {
      this.router.post("/signup",asyncHandler(authController.register.bind(authController)))
      this.router.post("/login",asyncHandler(authController.login.bind(authController)))
      this.router.post("/sent-otp", asyncHandler(authController.sentOtpEmail.bind(authController)))
      this.router.put("/forgot-password",asyncHandler(forgotPasswordController.handle.bind(forgotPasswordController)))
      this.router.post("/forgot-password/sent-otp",asyncHandler(forgotOtpController.handle.bind(forgotOtpController)));
      this.router.post("/verify-otp",asyncHandler(authController.verifyOtp.bind(authController)));
      this.router.post("/google-auth",asyncHandler(authController.authenticatedWithGoogle.bind(authController)));
      this.router.post("/save-fcm",asyncHandler(authController.saveFcmToken.bind(authController)))
    }
  }