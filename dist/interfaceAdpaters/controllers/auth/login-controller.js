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
exports.loginUserController = void 0;
const tsyringe_1 = require("tsyringe");
const constants_1 = require("@shared/constants");
const user_login_validation_schema_1 = require("./validations/user-login-validation.schema");
const cookie_helper_1 = require("@shared/utils/cookie-helper");
let loginUserController = class loginUserController {
    constructor(loginUseCases, generateTokenUseCase) {
        this.loginUseCases = loginUseCases;
        this.generateTokenUseCase = generateTokenUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log("from vendor login", data);
            const validatedData = user_login_validation_schema_1.loginSchema.parse(data);
            if (!validatedData) {
                res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS
                });
                return;
            }
            const user = yield this.loginUseCases.execute(validatedData);
            if (!user._id || !user.role || !user.email) {
                throw new Error("User ID , Role or Email is missing");
            }
            const userId = user._id.toString();
            const token = yield this.generateTokenUseCase.execute(userId, user.email, user.role);
            const accessTokenName = `${user.role}_access_token`;
            const refreshTokenName = `${user.role}_refresh_token`;
            (0, cookie_helper_1.setAuthCookies)(res, token.accessToken, token.refreshToken, accessTokenName, refreshTokenName);
            res.status(constants_1.HTTP_STATUS.OK).json({
                success: true,
                message: constants_1.SUCCESS_MESSAGES.LOGIN_SUCCESS,
                user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            });
        });
    }
};
exports.loginUserController = loginUserController;
exports.loginUserController = loginUserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ILoginUserUseCase")),
    __param(1, (0, tsyringe_1.inject)("IGenerateTokenUseCase")),
    __metadata("design:paramtypes", [Object, Object])
], loginUserController);
