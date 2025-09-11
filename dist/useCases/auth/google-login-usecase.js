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
exports.GoogleuseCase = void 0;
const tsyringe_1 = require("tsyringe");
const google_auth_library_1 = require("google-auth-library");
const custom_error_1 = require("@entities/utils/custom.error");
const constants_1 = require("@shared/constants");
let GoogleuseCase = class GoogleuseCase {
    constructor(clientRegister, clientLogin, emailService) {
        this.clientRegister = clientRegister;
        this.clientLogin = clientLogin;
        this.emailService = emailService;
        this.registerStrategies = {
            client: this.clientRegister,
        };
        this.loginStrategies = {
            client: this.clientLogin,
        };
        this.client = new google_auth_library_1.OAuth2Client();
    }
    execute(credential, client_id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerStrategy = this.registerStrategies[role];
            const loginStrategy = this.loginStrategies[role];
            if (!registerStrategy || !loginStrategy) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.INVALID_ROLE, constants_1.HTTP_STATUS.FORBIDDEN);
            }
            const ticket = yield this.client.verifyIdToken({
                idToken: credential,
                audience: client_id
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.PAYLAOD_NOT_FOUND, constants_1.HTTP_STATUS.UNAUTHORIZED);
            }
            const googleId = payload.sub;
            const email = payload.email;
            const name = payload.given_name;
            const profileImage = payload.picture;
            if (!email) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.EMAIL_REQUIRED, constants_1.HTTP_STATUS.BAD_REQUEST);
            }
            const existingUser = yield loginStrategy.login({ email, role });
            if (!existingUser) {
                const newUser = yield registerStrategy.register({
                    name: name,
                    role,
                    googleId,
                    email,
                    profileImage
                });
                yield this.emailService.sendEmail(email, "🎉 Welcome to Eventora – You're All Set!", (0, constants_1.GOOGLE_LOGIN_SUCCESS_MESSAGE)(name));
                if (!newUser) {
                    throw new custom_error_1.CustomError("", 0);
                }
                return { email, role, _id: newUser._id, name: name };
            }
            return { email, role, _id: existingUser._id, name: name };
        });
    }
};
exports.GoogleuseCase = GoogleuseCase;
exports.GoogleuseCase = GoogleuseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("clientRegisterStrategy")),
    __param(1, (0, tsyringe_1.inject)("ClientGoogleLoginStrategy")),
    __param(2, (0, tsyringe_1.inject)("IEmailService")),
    __metadata("design:paramtypes", [Object, Object, Object])
], GoogleuseCase);
