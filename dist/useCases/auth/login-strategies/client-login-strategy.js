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
exports.ClientLoginStrategy = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("@entities/utils/custom.error");
const constants_1 = require("@shared/constants");
let ClientLoginStrategy = class ClientLoginStrategy {
    constructor(clientRepository, passwordBcrypt) {
        this.clientRepository = clientRepository;
        this.passwordBcrypt = passwordBcrypt;
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.clientRepository.findByEmail(user.email);
            if (!client) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.EMAIL_NOT_FOUND, constants_1.HTTP_STATUS.NOT_FOUND);
            }
            if (client.status !== "active") {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.BLOCKED, constants_1.HTTP_STATUS.FORBIDDEN);
            }
            if (user.password) {
                const passwordIsMatch = yield this.passwordBcrypt.compare(user.password, client.password);
                console.log(passwordIsMatch);
                if (!passwordIsMatch) {
                    throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, constants_1.HTTP_STATUS.BAD_REQUEST);
                }
            }
            return client;
        });
    }
};
exports.ClientLoginStrategy = ClientLoginStrategy;
exports.ClientLoginStrategy = ClientLoginStrategy = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IClientRepository")),
    __param(1, (0, tsyringe_1.inject)("IPasswordBcrypt")),
    __metadata("design:paramtypes", [Object, Object])
], ClientLoginStrategy);
