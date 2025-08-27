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
exports.BlockedStatusMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const constants_1 = require("@shared/constants");
const redis_client_1 = require("@frameworks/cache/redis.client");
const cookie_helper_1 = require("@shared/utils/cookie-helper");
let BlockedStatusMiddleware = class BlockedStatusMiddleware {
    constructor(clientRepository, vendorRepository, revokeRefreshTokenUseCase, blackListTokenUseCase) {
        this.clientRepository = clientRepository;
        this.vendorRepository = vendorRepository;
        this.revokeRefreshTokenUseCase = revokeRefreshTokenUseCase;
        this.blackListTokenUseCase = blackListTokenUseCase;
        this.checkBlockedStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(constants_1.HTTP_STATUS.UNAUTHORIZED).json({
                        success: false,
                        message: constants_1.ERROR_MESSAGES.UNAUTH_NO_USER_FOUND
                    });
                    return;
                }
                const { id, role } = req.user;
                const cacheKey = `user_status:${role}:${id}`;
                let status = yield redis_client_1.RedisClient.get(cacheKey);
                console.log("what user tate", status);
                if (!status) {
                    if (role == "client") {
                        const client = yield this.clientRepository.findById(id);
                        if (!client) {
                            res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                                .json({ success: false, message: constants_1.ERROR_MESSAGES.USER_NOT_FOUND });
                            return;
                        }
                        status = client.status;
                    }
                    else if (role == "vendor") {
                        const vendor = yield this.vendorRepository.findById(id);
                        if (!vendor) {
                            res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                                .json({ success: false, message: constants_1.ERROR_MESSAGES.USER_NOT_FOUND });
                            return;
                        }
                        status = vendor.status;
                    }
                    else {
                        res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                            .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_ROLE });
                        return;
                    }
                    yield redis_client_1.RedisClient.set(cacheKey, status !== null && status !== void 0 ? status : "null", {
                        EX: 3600
                    });
                }
                if (status !== "active") {
                    yield this.blackListTokenUseCase.execute(req.user.access_token);
                    yield this.revokeRefreshTokenUseCase.execute(req.user.refresh_token);
                    const accessTokenName = `${role}_access_token`;
                    const refreshTokenName = `${role}_refresh_token`;
                    (0, cookie_helper_1.clearAuthCookie)(res, accessTokenName, refreshTokenName);
                    res.status(constants_1.HTTP_STATUS.FORBIDDEN)
                        .json({ success: false, message: constants_1.ERROR_MESSAGES.BLOCKED });
                    return;
                }
                next();
            }
            catch (error) {
                console.log("error in block status middleware", error);
                res.status(constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.SERVER_ERROR });
                return;
            }
        });
    }
};
exports.BlockedStatusMiddleware = BlockedStatusMiddleware;
exports.BlockedStatusMiddleware = BlockedStatusMiddleware = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IClientRepository")),
    __param(1, (0, tsyringe_1.inject)("IVendorRepository")),
    __param(2, (0, tsyringe_1.inject)("IRevokeRefreshTokenUseCase")),
    __param(3, (0, tsyringe_1.inject)("IBlacklistTokenUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], BlockedStatusMiddleware);
