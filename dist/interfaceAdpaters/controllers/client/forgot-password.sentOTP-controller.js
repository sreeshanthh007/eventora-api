"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotOtpController = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("@entities/utils/custom.error");
const constants_1 = require("@shared/constants");
const sent_forgot_password_otp_usecase_1 = require("@usecases/auth/sent-forgot.password-otp.usecase");
const clientExist_service_1 = require("interfaceAdpaters/services/client/clientExist-service");
let ForgotOtpController = class ForgotOtpController {
    constructor(sendOTPForPassword, clientExistService) {
        this.sendOTPForPassword = sendOTPForPassword;
        this.clientExistService = clientExistService;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const exist = yield this.clientExistService.emailExists(email);
            if (!exist) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.EMAIL_NOT_FOUND, constants_1.HTTP_STATUS.NOT_FOUND);
            }
            yield this.sendOTPForPassword.execute(email);
            res.status(constants_1.HTTP_STATUS.OK).json({ success: true, message: constants_1.SUCCESS_MESSAGES.OTP_SEND_SUCCESS });
        });
    }
};
exports.ForgotOtpController = ForgotOtpController;
exports.ForgotOtpController = ForgotOtpController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ISendOTPForPasswordUseCase")),
    __param(1, (0, tsyringe_1.inject)("IClientExistService")),
    __metadata("design:paramtypes", [sent_forgot_password_otp_usecase_1.sendForgotPasswordOtp,
        clientExist_service_1.ClientExistService])
], ForgotOtpController);
