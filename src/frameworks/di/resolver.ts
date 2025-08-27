import { container } from "tsyringe";

import { DependencyInjection } from ".";
import { ForgotOtpController } from "interfaceAdpaters/controllers/client/forgot-password.sentOTP-controller";
import { ForgotPasswordController } from "interfaceAdpaters/controllers/client/forgot-password-controller";


// ======logger=========//
import { LoggerMiddleWare } from "interfaceAdpaters/middlewares/logger.middleware";
import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { ErrorMiddleware } from "interfaceAdpaters/middlewares/error.middleware";
import { VendorForgotPassword } from "interfaceAdpaters/controllers/vendor/VendorforgotPasswordController";
import { ForgotVendorOTPController } from "interfaceAdpaters/controllers/vendor/forgot-password.vendorController";
import { BlockedStatusMiddleware } from "interfaceAdpaters/middlewares/block-status.middleware";
// import { EditVendorProfileController } from "interfaceAdpaters/controllers/vendor/edit-profile-controller";
import { AuthController } from "interfaceAdpaters/controllers/auth/auth-controller";
import { IAuthController } from "@entities/controllerInterfaces/auth/auth.controller.interface";
import { ICategoryController } from "@entities/controllerInterfaces/category/category.interface";
import { CategoryController } from "interfaceAdpaters/controllers/category-controller";
import { IAdminVendorController } from "@entities/controllerInterfaces/admin/admin.vendor.controller.interface";
import { AdminVendorController } from "interfaceAdpaters/controllers/admin/vendor-controller";
import { IAdminClientController } from "@entities/controllerInterfaces/admin/client.controller.interface";
import { AdminClientController } from "interfaceAdpaters/controllers/admin/admin.client-controller";
import { IFetchCategoryController } from "@entities/controllerInterfaces/client/get-all-categories.interface";

import { IEventController } from "@entities/controllerInterfaces/vendor/event/event-controller.interface";
import { EventController } from "interfaceAdpaters/controllers/vendor/event/event-controller";
import { IClientController } from "@entities/controllerInterfaces/client/client-controller.interface";
import { ClientController } from "interfaceAdpaters/controllers/client/client-controller";
import { IVendorController } from "@entities/controllerInterfaces/vendor/vendor-controller.interface";
import { VendorController } from "interfaceAdpaters/controllers/vendor/vendor-controller";
import { IAdminController } from "@entities/controllerInterfaces/admin/admin.controller.interface";
import { AdminController } from "interfaceAdpaters/controllers/admin/admin-controller";
import { IServiceController } from "@entities/controllerInterfaces/vendor/service/service-controller.interface";
import { ServiceController } from "interfaceAdpaters/controllers/vendor/service/service-controller";
import { FetchCategoryController } from "interfaceAdpaters/controllers/client/category-controller";


DependencyInjection.registerAll();
export const blockstatusMiddleware = container.resolve(BlockedStatusMiddleware);

export const authController = container.resolve<IAuthController>(AuthController)
export const adminController = container.resolve<IAdminController>(AdminController)
export const adminVendorController = container.resolve<IAdminVendorController>(AdminVendorController)
export const adminClientController = container.resolve<IAdminClientController>(AdminClientController)
export const clientController = container.resolve<IClientController>(ClientController)
export const vendoController = container.resolve<IVendorController>(VendorController)
export const categoryController = container.resolve<ICategoryController>(CategoryController)
export const eventController = container.resolve<IEventController>(EventController)
export const serviceController = container.resolve<IServiceController>(ServiceController);
export const fetchCategoryController = container.resolve<IFetchCategoryController>(FetchCategoryController)
export const forgotOtpController = container.resolve(ForgotOtpController);

export const forgotPasswordController = container.resolve(
  ForgotPasswordController
);

export const forgotVendorOTPController = container.resolve(
  ForgotVendorOTPController
);

export const forgotVendorPasswordController =
  container.resolve(VendorForgotPassword);






// logger  middleware//
export const injectedLoggerMiddleWare =
  container.resolve<LoggerMiddleWare>(LoggerMiddleWare);
export const injectedLogger = container.resolve<ILogger>("ILogger");

// =========error handling middleware=========//
export const errorMiddleware =
  container.resolve<ErrorMiddleware>("ErrorMiddleware");
