



import { asyncHandler } from "@shared/async-handler";
import { BaseRouter } from "../base.route";
import { authorizeRole, decodeToken, verifyAuth } from "interfaceAdpaters/middlewares/auth.middleware";
import { 
    getAlluserscontroller, 
    categoryController,
    getAllVendorsController, 
    toggleUsercontroller,
     toggleVendorController,
    getAllRequestedVendorsController,
     approveVendorController,
     rejectVendorController,
     hostNewEventController,
     authController

 } from "@frameworks/di/resolver";

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

        this.router.get(
            "/requested-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(getAllRequestedVendorsController.handle.bind(getAllRequestedVendorsController))
        )

        this.router.patch(
            "/approve-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(approveVendorController.handle.bind(approveVendorController))
        );

        this.router.patch(
            "/reject-vendors",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(rejectVendorController.handle.bind(rejectVendorController))
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
            "/add-event",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(hostNewEventController.handle.bind(hostNewEventController))
        );

        this.router.post(
            "/logout",
            verifyAuth,
            authorizeRole(["admin"]),
            asyncHandler(authController.logout.bind(authController))
        )
    }


}