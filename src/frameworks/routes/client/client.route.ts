import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authController,blockstatusMiddleware,clientController,fetchCategoryController } from "@frameworks/di/resolver";
import { authorizeRole, decodeToken , verifyAuth} from "interfaceAdpaters/middlewares/auth.middleware";
import { RequestHandler } from "express";


export class ClientRoutes extends BaseRouter{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/refresh-token",decodeToken,asyncHandler(authController.handleTokenRefresh.bind(authController)))
     

        this.router.get(
            "/all-categories",
            asyncHandler(fetchCategoryController.getAllCategories.bind(fetchCategoryController))
        );

        this.router.get(
            "/refresh-session",
            verifyAuth,
            authorizeRole(["client"]),
            blockstatusMiddleware.checkBlockedStatus as RequestHandler,
            asyncHandler(clientController.refreshSession.bind(clientController))
        );


        this.router.post(
            "/update-profileImage",
            verifyAuth,
            authorizeRole(["client"]),
            asyncHandler(clientController.updateProfileImage.bind(clientController))
        );

        this.router.patch(
            "/update-profile",
            verifyAuth,
            authorizeRole(["client"]),
            asyncHandler(clientController.updateProfileInformation.bind(clientController))
        )
        this.router.post("/logout",verifyAuth,asyncHandler(authController.logout.bind(authController)))
    }
}   