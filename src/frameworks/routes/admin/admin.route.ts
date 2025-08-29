



import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authorizeRole, decodeToken, verifyAuth } from "interfaceAdpaters/middlewares/auth.middleware";
import { 
    categoryController,
     authController,
     adminVendorController,
     adminClientController,
     adminController
 } from "@frameworks/di/resolver";

export class AdminRotes extends BaseRouter{
     constructor() {
    super();
  }

  protected initializeRoutes(): void {
       this.router.get(
      "/users",
      authorizeRole(["admin"]),
      verifyAuth,
      asyncHandler(adminClientController.getAllClients.bind(adminClientController))
    );

    this.router.get(
            "/vendors",
            authorizeRole(["admin"]),
            verifyAuth,
            asyncHandler(adminVendorController.getAllVendors.bind(adminVendorController))
        )

        this.router.get(
            "/requested-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(adminVendorController.getRequestedVendors.bind(adminVendorController))
        )

        this.router.patch(
            "/:vendorId/approve-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(adminVendorController.approveVendor.bind(adminVendorController))
        );

        this.router.patch(
            "/:vendorId/reject-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(adminVendorController.rejectVendor.bind(adminVendorController))
        )
        
    this.router.patch(
        "/user-status",
        authorizeRole(["admin"]),
        verifyAuth,
            asyncHandler(adminClientController.updateClientAccountStatus.bind(adminClientController))
    );

    this.router.patch(
        "/vendor-status",
        authorizeRole(["admin"]),
        verifyAuth,
        asyncHandler(adminVendorController.udpateVendorAccountStatus.bind(adminVendorController))
    );

    this.router.patch(
        "/category-status",
        authorizeRole(["admin"]),
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
            authorizeRole(["admin"]),
            verifyAuth,
            asyncHandler(categoryController.addCategory.bind(categoryController))
        );

        this.router.patch(
            "/edit-category/:categoryId",
            authorizeRole(["admin"]),
            verifyAuth,
            asyncHandler(adminController.editCategory.bind(adminController))
        );

        this.router.post(
            "/logout",
            authorizeRole(["admin"]),
            verifyAuth,
            asyncHandler(authController.logout.bind(authController))
        )
    }
}