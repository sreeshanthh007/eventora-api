
import { BaseRouter } from "../base.route";
import { authController } from "@frameworks/di/resolver";



export class CloudinaryRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.get("/signature", authController.getUploadSignature.bind(authController));

    }
}
