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
exports.AuthController = void 0;
const tsyringe_1 = require("tsyringe");
const user_signup_validation_schema_1 = require("./validations/user-signup-validation.schema");
const constants_1 = require("@shared/constants");
const user_login_validation_schema_1 = require("./validations/user-login-validation.schema");
const cookie_helper_1 = require("@shared/utils/cookie-helper");
const email_validation_schema_1 = require("./validations/email.validation.schema");
let AuthController = class AuthController {
    constructor(_registerUseCase, _loginUserUseCase, _generateTokenUseCase, _googleLoginUseCase, _refreshTokenUseCase, _revokeRefreshTokenUseCase, _blackListTokenUseCase, _verifyOtpUseCase, _getAllUsersDetailsUseCase, _fcmTokenUseCase, _sendEmailUseCase, _cloudinaryService) {
        this._registerUseCase = _registerUseCase;
        this._loginUserUseCase = _loginUserUseCase;
        this._generateTokenUseCase = _generateTokenUseCase;
        this._googleLoginUseCase = _googleLoginUseCase;
        this._refreshTokenUseCase = _refreshTokenUseCase;
        this._revokeRefreshTokenUseCase = _revokeRefreshTokenUseCase;
        this._blackListTokenUseCase = _blackListTokenUseCase;
        this._verifyOtpUseCase = _verifyOtpUseCase;
        this._getAllUsersDetailsUseCase = _getAllUsersDetailsUseCase;
        this._fcmTokenUseCase = _fcmTokenUseCase;
        this._sendEmailUseCase = _sendEmailUseCase;
        this._cloudinaryService = _cloudinaryService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role } = req.body;
            const schema = user_signup_validation_schema_1.userSchema[role];
            if (!schema) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND).json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS });
                return;
            }
            const validateData = schema.parse(req.body);
            yield this._registerUseCase.execute(validateData);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.REGISTERATION_SUCCESS });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const validatedData = user_login_validation_schema_1.loginSchema.parse(data);
            if (!validatedData) {
                res.status(constants_1.HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS });
                return;
            }
            const user = yield this._loginUserUseCase.execute(validatedData);
            if (!user._id || !user.email || !user.role) {
                throw new Error("user id , email or role is missing");
            }
            const userId = user._id.toString();
            const token = yield this._generateTokenUseCase.execute(userId, user.email, user.role);
            const accessTokenName = `${user.role}_access_token`;
            const refreshTokenName = `${user.role}_refresh_token`;
            (0, cookie_helper_1.setAuthCookies)(res, token.accessToken, token.refreshToken, accessTokenName, refreshTokenName);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true,
                message: constants_1.SUCCESS_MESSAGES.LOGIN_SUCCESS,
                user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            });
        });
    }
    authenticatedWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { credential, role, client_id } = req.body;
            const user = yield this._googleLoginUseCase.execute(credential, client_id, role);
            if (!user._id || !user.role || !user.email) {
                throw new Error("role,client_id or email is missing");
            }
            const userId = user._id.toString();
            const token = yield this._generateTokenUseCase.execute(userId, user.email, user.role);
            const accessTokenName = `${user.role}_access_token`;
            const refreshTokenName = `${user.role}_refresh_token`;
            (0, cookie_helper_1.setAuthCookies)(res, token.accessToken, token.refreshToken, accessTokenName, refreshTokenName);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ sucess: true, message: constants_1.SUCCESS_MESSAGES.LOGIN_SUCCESS,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.user;
            yield this._blackListTokenUseCase.execute(req.user.access_token);
            yield this._revokeRefreshTokenUseCase.execute(req.user.refresh_token);
            const user = req.user;
            const accessTokenName = `${user.role}_access_token`;
            const refreshTokenName = `${user.role}_refresh_token`;
            (0, cookie_helper_1.clearAuthCookie)(res, accessTokenName, refreshTokenName);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.USER_LOGOUT_SUCCESS });
        });
    }
    handleTokenRefresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.user.access_token;
            const newToken = this._refreshTokenUseCase.execute(token);
            const access_token_name = `${newToken.role}_access_token`;
            (0, cookie_helper_1.updateCookieWithAccessToken)(res, newToken.accessToken, access_token_name);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: "Token Refreshed Successfully", token: newToken.accessToken });
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            const validateData = email_validation_schema_1.emailVerifySchema.parse({ email, otp });
            yield this._verifyOtpUseCase.execute(validateData.email, validateData.otp);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, messagge: constants_1.SUCCESS_MESSAGES.VERIFICATION_SUCCESS });
        });
    }
    sentOtpEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.EMAIL_NOT_FOUND });
            }
            yield this._sendEmailUseCase.execute(email);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.OTP_SEND_SUCCESS });
        });
    }
    getUploadSignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = req.query.folder;
            if (!folder) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.FOLDER_NOT_FOUND });
            }
            const data = this._cloudinaryService.generateSignature(folder);
            res.json(data);
        });
    }
    refreshSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, role } = req.user;
            if (!id || !role) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_TOKEN });
            }
            const user = yield this._getAllUsersDetailsUseCase.execute(id, role);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, user: user });
        });
    }
    saveFcmToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("backnd", req.body);
            const { userId, fcmToken } = req.body;
            console.log("user id and token", userId, fcmToken);
            if (!userId || !fcmToken) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: "user id or fcm token is missing" });
                return;
            }
            yield this._fcmTokenUseCase.execute(userId, fcmToken);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: "token saved successfully" });
        });
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRegisterUseCase")),
    __param(1, (0, tsyringe_1.inject)("ILoginUserUseCase")),
    __param(2, (0, tsyringe_1.inject)("IGenerateTokenUseCase")),
    __param(3, (0, tsyringe_1.inject)("IGoogleUseCase")),
    __param(4, (0, tsyringe_1.inject)("IRefreshTokenUseCase")),
    __param(5, (0, tsyringe_1.inject)("IRevokeRefreshTokenUseCase")),
    __param(6, (0, tsyringe_1.inject)("IBlacklistTokenUseCase")),
    __param(7, (0, tsyringe_1.inject)("IVerifyOTPUseCase")),
    __param(8, (0, tsyringe_1.inject)("IGetAllUsersDetailsUseCase")),
    __param(9, (0, tsyringe_1.inject)("IFcmTokenUseCase")),
    __param(10, (0, tsyringe_1.inject)("ISendEmailUseCase")),
    __param(11, (0, tsyringe_1.inject)("ICloudinarySignatureService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], AuthController);
