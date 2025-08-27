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
exports.GoogleController = void 0;
const constants_1 = require("@shared/constants");
const cookie_helper_1 = require("@shared/utils/cookie-helper");
const tsyringe_1 = require("tsyringe");
let GoogleController = class GoogleController {
    constructor(googleUseCase, generateTokenUseCase) {
        this.googleUseCase = googleUseCase;
        this.generateTokenUseCase = generateTokenUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { credential, client_id, role } = req.body;
            const user = yield this.googleUseCase.execute(credential, client_id, role);
            if (!user._id || !user.email || !user.role) {
                throw new Error("User id , email or role is missing");
            }
            const userId = user._id.toString();
            const tokens = yield this.generateTokenUseCase.execute(userId, user.email, user.role);
            const accessTokenName = `${user.role}_access_token`;
            const refreshTokenName = `${user.role}_refresh_token`;
            (0, cookie_helper_1.setAuthCookies)(res, tokens.accessToken, tokens.refreshToken, accessTokenName, refreshTokenName);
            res.status(constants_1.HTTP_STATUS.OK).json({
                success: true,
                message: constants_1.SUCCESS_MESSAGES.LOGIN_SUCCESS,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        });
    }
};
exports.GoogleController = GoogleController;
exports.GoogleController = GoogleController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IGoogleUseCase")),
    __param(1, (0, tsyringe_1.inject)("IGenerateTokenUseCase")),
    __metadata("design:paramtypes", [Object, Object])
], GoogleController);
