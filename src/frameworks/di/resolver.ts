import { container } from "tsyringe";

import { DependencyInjection } from ".";
import { ForgotOtpController } from "@controllers/client/forgot-password.sentOTP-controller";
import { ForgotPasswordController } from "@controllers/client/forgot-password-controller";


// ======logger=========//
import { LoggerMiddleWare } from "@middlewares/logger.middleware";
import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { VendorForgotPassword } from "@controllers/vendor/VendorforgotPasswordController";
import { ForgotVendorOTPController } from "@controllers/vendor/forgot-password.vendorController";
import { BlockedStatusMiddleware } from "@middlewares/block-status.middleware";
import { AuthController } from "@controllers/auth/auth-controller";
import { IAuthController } from "@entities/controllerInterfaces/auth/auth.controller.interface";
import { ICategoryController } from "@entities/controllerInterfaces/category/category.interface";
import { CategoryController } from "@controllers/category-controller";
import { IAdminVendorController } from "@entities/controllerInterfaces/admin/admin.vendor.controller.interface";
import { AdminVendorController } from "@controllers/admin/vendor-controller";
import { IAdminClientController } from "@entities/controllerInterfaces/admin/client.controller.interface";
import { AdminClientController } from "interfaceAdpaters/controllers/admin/admin.client-controller";


import { IEventController } from "@entities/controllerInterfaces/vendor/event/event-controller.interface";
import { EventController } from "@controllers/vendor/event/event-controller";
import { IClientController } from "@entities/controllerInterfaces/client/client-controller.interface";
import { ClientController } from "@controllers/client/client-controller";
import { IVendorController } from "@entities/controllerInterfaces/vendor/vendor-controller.interface";
import { VendorController } from "@controllers/vendor/vendor-controller";
import { IAdminController } from "@entities/controllerInterfaces/admin/admin.controller.interface";
import { AdminController } from "@controllers/admin/admin-controller";
import { IServiceController } from "@entities/controllerInterfaces/vendor/service/service-controller.interface";
import { ServiceController } from "@controllers/vendor/service/service-controller";
import { IEventBookingController } from "@entities/controllerInterfaces/client/eventBooking/event-booking-controller.interface";
import { EventBookingController } from "@controllers/client/eventBooking/event-booking-controller";
import { IChatSocketHandler } from "@entities/socketHandlerInterfaces/chat-socket.handle.interface";
import { ChatSocketHandler } from "interfaceAdpaters/websockets/handlers/chat.handler";
import { IClientRatingController } from "@entities/controllerInterfaces/client/rating/client-rating-controller.interface";
import { ClientRatingCOntroller } from "@controllers/client/rating/client-rating-controller";



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
export const eventBookingController = container.resolve<IEventBookingController>(EventBookingController);
export const clientRatingController = container.resolve<IClientRatingController>(ClientRatingCOntroller)

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


  export const chatSocketHandler = 
  container.resolve<IChatSocketHandler>(ChatSocketHandler)
