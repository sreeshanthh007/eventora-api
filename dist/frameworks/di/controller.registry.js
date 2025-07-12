"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const register_controller_1 = require("interfaceAdpaters/controllers/auth/register-controller");
const login_controller_1 = require("interfaceAdpaters/controllers/auth/login-controller");
const verifyOtp_controller_1 = require("interfaceAdpaters/controllers/auth/verifyOtp-controller");
const sent_otp_controller_1 = require("interfaceAdpaters/controllers/auth/sent-otp-controller");
class ControllerRegistry {
    static registerControllers() {
        tsyringe_1.container.register("RegisterUsercontroller", {
            useClass: register_controller_1.registerUserController
        });
        tsyringe_1.container.register("loginUserController", {
            useClass: login_controller_1.loginUserController
        });
        tsyringe_1.container.register("VerifyOTPController", {
            useClass: verifyOtp_controller_1.VerifyOTPController
        });
        tsyringe_1.container.register("SendOTPController", {
            useClass: sent_otp_controller_1.SendOTPController
        });
    }
}
exports.ControllerRegistry = ControllerRegistry;
