import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { logoutController, refreshTokenController } from "@frameworks/di/resolver";
import { decodeToken , verifyAuth} from "interfaceAdpaters/middlewares/auth.middleware";
import { forgotPasswordController } from "@frameworks/di/resolver";


export class ClientRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/refresh-token",decodeToken,asyncHandler(refreshTokenController.handle.bind(refreshTokenController)))
        this.router.put("/forgot-password",asyncHandler(forgotPasswordController.handle.bind(forgotPasswordController)))

        this.router.post("/logout",verifyAuth,logoutController.handle.bind(logoutController))
    }
}