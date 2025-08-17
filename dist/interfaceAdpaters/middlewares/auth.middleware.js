"use strict";
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
exports.authorizeRole = exports.decodeToken = exports.verifyAuth = void 0;
const jwtService_1 = require("interfaceAdpaters/services/jwtService");
const constants_1 = require("@shared/constants");
const redis_client_1 = require("@frameworks/cache/redis.client");
const tokenService = new jwtService_1.jwtService();
const extractToken = (req) => {
    const basePath = req.baseUrl.split("/");
    const userType = basePath[2];
    if (["client", "vendor", "admin"].includes(userType)) {
        return {
            access_token: req.cookies[`${userType}_access_token`] || null,
            refresh_token: req.cookies[`${userType}_refresh_token`] || null,
        };
    }
    return null;
};
const isBlacklisted = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redis_client_1.RedisClient.get(token);
    console.log("is token blacklisted", result);
    return result !== null;
});
const verifyAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = extractToken(req);
        if (!token) {
            res
                .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
                .json({ message: constants_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
            return;
        }
        if (yield isBlacklisted(token.access_token)) {
            res.status(constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: "Token is Blacklisted" });
        }
        const user = tokenService.verifyAccessToken(token.access_token);
        if (!user || !user.id) {
            res.status(constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: constants_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
        }
        req.user = Object.assign(Object.assign({}, user), { access_token: token.access_token, refresh_token: token.refresh_token });
        next();
    }
    catch (error) {
        console.log("token is invalid is worked", error);
        res
            .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
            .json({ message: constants_1.ERROR_MESSAGES.INVALID_TOKEN });
        return;
    }
});
exports.verifyAuth = verifyAuth;
const decodeToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = extractToken(req);
        console.log("this si the toke to decode", token);
        if (!(token === null || token === void 0 ? void 0 : token.refresh_token)) {
            console.log("no token for decode");
            res
                .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
                .json({ message: constants_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
            return;
        }
        // if(await isBlacklisted(token?.refresh_token)){
        //     console.log("token is blacklisted");
        //     res.status(HTTP_STATUS.UNAUTHORIZED)
        //     .json({message:"Token is blacklisted"})
        //     return
        // };
        const user = tokenService.verifyRefreshToken(token === null || token === void 0 ? void 0 : token.refresh_token);
        const newAccessToken = tokenService.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        req.user = {
            id: user === null || user === void 0 ? void 0 : user.id,
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role,
            access_token: newAccessToken,
            refresh_token: token.refresh_token
        };
        next();
    }
    catch (error) {
        console.log("failed to decode", error);
    }
});
exports.decodeToken = decodeToken;
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            console.log("this role is not allowed");
            res.status(constants_1.HTTP_STATUS.FORBIDDEN).json({ message: constants_1.ERROR_MESSAGES.NOT_ALLOWED, user: user ? user.role : "" });
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
