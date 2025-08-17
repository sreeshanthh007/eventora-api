import { container } from "tsyringe";

import { DependencyInjection } from ".";
import { ForgotOtpController } from "interfaceAdpaters/controllers/client/forgot-password.sentOTP-controller";
import { ForgotPasswordController } from "interfaceAdpaters/controllers/client/forgot-password-controller";


// ======logger=========//
import { LoggerMiddleWare } from "interfaceAdpaters/middlewares/logger.middleware";
import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { ErrorMiddleware } from "interfaceAdpaters/middlewares/error.middleware";
import { GetAllUserController } from "interfaceAdpaters/controllers/admin/get-all-clients";
import { HandleToggleStatus } from "interfaceAdpaters/controllers/admin/handleToggleClientStatus";
import { VendorForgotPassword } from "interfaceAdpaters/controllers/vendor/VendorforgotPasswordController";
import { GetAllVendorsController } from "interfaceAdpaters/controllers/admin/get-all-vendors.controllers";
import { HandleToggleVendorStatus } from "interfaceAdpaters/controllers/admin/handleToggleVendorController";
import { ForgotVendorOTPController } from "interfaceAdpaters/controllers/vendor/forgot-password.vendorController";
import { BlockedStatusMiddleware } from "interfaceAdpaters/middlewares/block-status.middleware";
import { GetRequestedVendorsController } from "interfaceAdpaters/controllers/admin/get-requested-vendor-controller";
import { ApproveVendorController } from "interfaceAdpaters/controllers/admin/approve-vendor-controller";
import { RejectVendorController } from "interfaceAdpaters/controllers/admin/reject-vendor-controller";
import { EditVendorProfileController } from "interfaceAdpaters/controllers/vendor/edit-profile-controller";
import { HostNewEventController } from "interfaceAdpaters/controllers/vendor/event/host-new-event-controller";
import { GetAllCategoryForClientsController } from "interfaceAdpaters/controllers/client/get-all-category-controller";
import { AuthController } from "interfaceAdpaters/controllers/auth/auth-controller";
import { IAuthController } from "@entities/controllerInterfaces/auth/auth.controller.interface";
import { ICategoryController } from "@entities/controllerInterfaces/category/category.interface";
import { CategoryController } from "interfaceAdpaters/controllers/category-controller";

DependencyInjection.registerAll();
export const blockstatusMiddleware = container.resolve(BlockedStatusMiddleware);

export const authController = container.resolve<IAuthController>(AuthController)

export const categoryController = container.resolve<ICategoryController>(CategoryController)
export const forgotOtpController = container.resolve(ForgotOtpController);

export const forgotPasswordController = container.resolve(
  ForgotPasswordController
);

export const forgotVendorOTPController = container.resolve(
  ForgotVendorOTPController
);

export const forgotVendorPasswordController =
  container.resolve(VendorForgotPassword);


export const getAlluserscontroller = container.resolve(GetAllUserController);


export const toggleUsercontroller = container.resolve(HandleToggleStatus);

export const toggleVendorController = container.resolve(
  HandleToggleVendorStatus
);

export const getAllVendorsController = container.resolve(
  GetAllVendorsController
);

export const getAllRequestedVendorsController = container.resolve(
  GetRequestedVendorsController
)
export const approveVendorController = container.resolve(
  ApproveVendorController
);

export const rejectVendorController = container.resolve(
  RejectVendorController
);



export const editVendorProfileController = container.resolve(
  EditVendorProfileController
);

export const hostNewEventController = container.resolve(
  HostNewEventController
);


export const getAllCategoryForClientsController = container.resolve(
  GetAllCategoryForClientsController
)

// logger  middleware//
export const injectedLoggerMiddleWare =
  container.resolve<LoggerMiddleWare>(LoggerMiddleWare);
export const injectedLogger = container.resolve<ILogger>("ILogger");

// =========error handling middleware=========//
export const errorMiddleware =
  container.resolve<ErrorMiddleware>("ErrorMiddleware");
