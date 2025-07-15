



import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { decodeToken, verifyAuth } from "interfaceAdpaters/middlewares/auth.middleware";
import { getAlluserscontroller, getAllVendorsController, refreshTokenController, toggleUsercontroller, toggleVendorController } from "@frameworks/di/resolver";

export class AdminRotes extends BaseRouter{
     constructor() {
    super();
  }

  protected initializeRoutes(): void {
       this.router.get(
      "/users",
      verifyAuth,
      asyncHandler(getAlluserscontroller.handle.bind(getAlluserscontroller))
    );

    this.router.get(
            "/vendors",
            verifyAuth,
            asyncHandler(getAllVendorsController.handle.bind(getAllVendorsController))
        )

    this.router.patch(
        "/user-status",
        verifyAuth,
        asyncHandler(toggleUsercontroller.handle.bind(toggleUsercontroller))
    );

    this.router.patch(
        "/vendor-status",
        verifyAuth,
        asyncHandler(toggleVendorController.handle.bind(toggleVendorController))
    )

        this.router.post(
            "/refresh-token",
            decodeToken,
            asyncHandler(refreshTokenController.handle.bind(refreshTokenController))
        )
    }


}