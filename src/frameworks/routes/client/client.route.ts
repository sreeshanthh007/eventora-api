import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { refreshTokenController } from "@frameworks/di/resolver";
import { decodeToken , verifyAuth , authorizeRole } from "interfaceAdpaters/middlewares/auth.middleware";

export class ClientRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/refresh-token",decodeToken,asyncHandler(refreshTokenController.handle.bind(refreshTokenController)))
    }
}