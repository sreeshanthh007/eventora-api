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
exports.RefreshTokenController = void 0;
const tsyringe_1 = require("tsyringe");
const cookie_helper_1 = require("@shared/utils/cookie-helper");
const constants_1 = require("@shared/constants");
let RefreshTokenController = class RefreshTokenController {
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.user.refresh_token;
                const new_token = this.refreshTokenUseCase.execute(token);
                const access_token_name = `${new_token.role}_access_token`;
                (0, cookie_helper_1.updateCookieWithAccessToken)(res, new_token.accessToken, access_token_name);
                res.status(constants_1.HTTP_STATUS.OK).json({ success: true, message: "Token refreshed successfully", token: new_token.accessToken });
            }
            catch (error) {
                console.log(error);
                (0, cookie_helper_1.clearAuthCookie)(res, `${req.user.role}_access_token`, `${req.user.role}_refresh_token`);
                res.status(constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid token" });
            }
        });
    }
};
exports.RefreshTokenController = RefreshTokenController;
exports.RefreshTokenController = RefreshTokenController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRefreshTokenUseCase")),
    __metadata("design:paramtypes", [Object])
], RefreshTokenController);
