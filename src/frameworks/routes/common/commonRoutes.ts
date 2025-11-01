
import {  verifyAuth } from "@middlewares/auth.middleware";
import { BaseRouter } from "../base.route";
import { authController, clientController } from "@frameworks/di/resolver";
import { asyncHandler } from "@shared/async-handler";



export class CommonRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.get("/cloudinary/signature", authController.getUploadSignature.bind(authController));

        this.router.patch("/read-notification/:notificationId",
            verifyAuth,
            asyncHandler(clientController.markAsReadNotifications.bind(clientController)));

    }
}
