



import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authorizeRole, decodeToken, verifyAuth } from "interfaceAdpaters/middlewares/auth.middleware";
import { 
    categoryController,
     authController,
     vendorController,
     adminClientController
 } from "@frameworks/di/resolver";

export class AdminRotes extends BaseRouter{
     constructor() {
    super();
  }

  protected initializeRoutes(): void {
       this.router.get(
      "/users",
      verifyAuth,
      asyncHandler(adminClientController.getAllClients.bind(adminClientController))
    );

    this.router.get(
            "/vendors",
            verifyAuth,
            asyncHandler(vendorController.getAllVendors.bind(vendorController))
        )

        this.router.get(
            "/requested-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(vendorController.getRequestedVendors.bind(vendorController))
        )

        this.router.patch(
            "/:vendorId/approve-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(vendorController.approveVendor.bind(vendorController))
        );

        this.router.patch(
            "/:vendorId/reject-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(vendorController.rejectVendor.bind(vendorController))
        )
        
    this.router.patch(
        "/user-status",
        verifyAuth,
            asyncHandler(adminClientController.updateClientAccountStatus.bind(adminClientController))
    );

    this.router.patch(
        "/vendor-status",
        verifyAuth,
        asyncHandler(vendorController.udpateVendorAccountStatus.bind(vendorController))
    );

    this.router.patch(
        "/category-status",
        verifyAuth,
        asyncHandler(categoryController.toogleCategory.bind(categoryController))
    )


    this.router.get(
        "/categories",
        verifyAuth,
        authorizeRole(["admin"]),
        asyncHandler(categoryController.getAllCategory.bind(categoryController))
    )

        this.router.post(
            "/refresh-token",
            decodeToken,
            asyncHandler(authController.handleTokenRefresh.bind(authController))
        )

        this.router.post(
            "/add-category",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(categoryController.addCategory.bind(categoryController))
        );

        this.router.post(
            "/logout",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(authController.logout.bind(authController))
        )
    }
}