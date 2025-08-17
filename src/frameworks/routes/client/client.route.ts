import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authController, getAllCategoryForClientsController, } from "@frameworks/di/resolver";
import { decodeToken , verifyAuth} from "interfaceAdpaters/middlewares/auth.middleware";


export class ClientRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/refresh-token",decodeToken,asyncHandler(authController.handleTokenRefresh.bind(authController)))
     

        this.router.get(
            "/all-categories",
            asyncHandler(getAllCategoryForClientsController.handle.bind(getAllCategoryForClientsController))
        )

        this.router.post("/logout",verifyAuth,asyncHandler(authController.logout.bind(authController)))
    }
}   