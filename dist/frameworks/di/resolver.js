"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.injectedLogger = exports.injectedLoggerMiddleWare = exports.editVendorProfileController = exports.forgotVendorPasswordController = exports.forgotVendorOTPController = exports.forgotPasswordController = exports.forgotOtpController = exports.fetchCategoryController = exports.eventController = exports.categoryController = exports.clientController = exports.adminClientController = exports.vendorController = exports.authController = exports.blockstatusMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const _1 = require(".");
const forgot_password_sentOTP_controller_1 = require("interfaceAdpaters/controllers/client/forgot-password.sentOTP-controller");
const forgot_password_controller_1 = require("interfaceAdpaters/controllers/client/forgot-password-controller");
// ======logger=========//
const logger_middleware_1 = require("interfaceAdpaters/middlewares/logger.middleware");
const VendorforgotPasswordController_1 = require("interfaceAdpaters/controllers/vendor/VendorforgotPasswordController");
const forgot_password_vendorController_1 = require("interfaceAdpaters/controllers/vendor/forgot-password.vendorController");
const block_status_middleware_1 = require("interfaceAdpaters/middlewares/block-status.middleware");
const edit_profile_controller_1 = require("interfaceAdpaters/controllers/vendor/edit-profile-controller");
const auth_controller_1 = require("interfaceAdpaters/controllers/auth/auth-controller");
const category_controller_1 = require("interfaceAdpaters/controllers/category-controller");
const vendor_controller_1 = require("interfaceAdpaters/controllers/admin/vendor-controller");
const admin_client_controller_1 = require("interfaceAdpaters/controllers/admin/admin.client-controller");
const category_controller_2 = require("interfaceAdpaters/controllers/client/category-controller");
const event_controller_1 = require("interfaceAdpaters/controllers/vendor/event/event-controller");
const client_controller_1 = require("interfaceAdpaters/controllers/client-controller");
_1.DependencyInjection.registerAll();
exports.blockstatusMiddleware = tsyringe_1.container.resolve(block_status_middleware_1.BlockedStatusMiddleware);
exports.authController = tsyringe_1.container.resolve(auth_controller_1.AuthController);
exports.vendorController = tsyringe_1.container.resolve(vendor_controller_1.VendorController);
exports.adminClientController = tsyringe_1.container.resolve(admin_client_controller_1.AdminClientController);
exports.clientController = tsyringe_1.container.resolve(client_controller_1.ClientController);
exports.categoryController = tsyringe_1.container.resolve(category_controller_1.CategoryController);
exports.eventController = tsyringe_1.container.resolve(event_controller_1.EventController);
exports.fetchCategoryController = tsyringe_1.container.resolve(category_controller_2.FetchCategoryController);
exports.forgotOtpController = tsyringe_1.container.resolve(forgot_password_sentOTP_controller_1.ForgotOtpController);
exports.forgotPasswordController = tsyringe_1.container.resolve(forgot_password_controller_1.ForgotPasswordController);
exports.forgotVendorOTPController = tsyringe_1.container.resolve(forgot_password_vendorController_1.ForgotVendorOTPController);
exports.forgotVendorPasswordController = tsyringe_1.container.resolve(VendorforgotPasswordController_1.VendorForgotPassword);
exports.editVendorProfileController = tsyringe_1.container.resolve(edit_profile_controller_1.EditVendorProfileController);
// logger  middleware//
exports.injectedLoggerMiddleWare = tsyringe_1.container.resolve(logger_middleware_1.LoggerMiddleWare);
exports.injectedLogger = tsyringe_1.container.resolve("ILogger");
// =========error handling middleware=========//
exports.errorMiddleware = tsyringe_1.container.resolve("ErrorMiddleware");
