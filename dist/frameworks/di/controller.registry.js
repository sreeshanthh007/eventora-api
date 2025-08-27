"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const register_controller_1 = require("interfaceAdpaters/controllers/auth/register-controller");
const login_controller_1 = require("interfaceAdpaters/controllers/auth/login-controller");
const verifyOtp_controller_1 = require("interfaceAdpaters/controllers/auth/verifyOtp-controller");
const sent_otp_controller_1 = require("interfaceAdpaters/controllers/auth/sent-otp-controller");
const forgot_password_sentOTP_controller_1 = require("interfaceAdpaters/controllers/client/forgot-password.sentOTP-controller");
const refresh_token_controller_1 = require("interfaceAdpaters/controllers/auth/refresh-token-controller");
const forgot_password_controller_1 = require("interfaceAdpaters/controllers/client/forgot-password-controller");
const forgot_password_vendorController_1 = require("interfaceAdpaters/controllers/vendor/forgot-password.vendorController");
const logout_controller_1 = require("interfaceAdpaters/controllers/auth/logout-controller");
const google_login_controller_1 = require("interfaceAdpaters/controllers/auth/google-login-controller");
const cloudinaryController_1 = require("interfaceAdpaters/controllers/auth/cloudinaryController");
const add_category_controller_1 = require("interfaceAdpaters/controllers/admin/add-category-controller");
class ControllerRegistry {
    static registerControllers() {
        tsyringe_1.container.register("RegisterUsercontroller", {
            useClass: register_controller_1.registerUserController
        });
        tsyringe_1.container.register("loginUserController", {
            useClass: login_controller_1.loginUserController
        });
        tsyringe_1.container.register("logoutController", {
            useClass: logout_controller_1.LogoutController
        });
        tsyringe_1.container.register("VerifyOTPController", {
            useClass: verifyOtp_controller_1.VerifyOTPController
        });
        tsyringe_1.container.register("SendOTPController", {
            useClass: sent_otp_controller_1.SendOTPController
        });
        tsyringe_1.container.register("RefreshTokenController", {
            useClass: refresh_token_controller_1.RefreshTokenController
        });
        tsyringe_1.container.register("ForgototpController", {
            useClass: forgot_password_sentOTP_controller_1.ForgotOtpController
        });
        tsyringe_1.container.register("ForgotVendorOTPController", {
            useClass: forgot_password_vendorController_1.ForgotVendorOTPController
        });
        // container.register("ForgotPasswordController",{
        //     useClass:ForgotPasswordController
        // })
        tsyringe_1.container.register("ForgotPasswordController", {
            useClass: forgot_password_controller_1.ForgotPasswordController
        });
        tsyringe_1.container.register("GoogleLoginController", {
            useClass: google_login_controller_1.GoogleController
        });
        tsyringe_1.container.register("CloudinaryController", {
            useClass: cloudinaryController_1.CloudinaryController
        });
        tsyringe_1.container.register("AddCategoryController", {
            useClass: add_category_controller_1.AddCategoryController
        });
    }
}
exports.ControllerRegistry = ControllerRegistry;
