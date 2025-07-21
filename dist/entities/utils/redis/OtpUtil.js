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
exports.deleteOTP = exports.getOTP = exports.setOTP = void 0;
const redis_client_1 = require("@frameworks/cache/redis.client");
const config_1 = require("@shared/config");
const setOTP = (key_1, otp_1, ...args_1) => __awaiter(void 0, [key_1, otp_1, ...args_1], void 0, function* (key, otp, ttl = 300) {
    yield redis_client_1.RedisClient.set(`${config_1.config.OTP_PREFIX}${key}`, otp, {
        EX: ttl,
    });
});
exports.setOTP = setOTP;
const getOTP = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redis_client_1.RedisClient.get(`${config_1.config.OTP_PREFIX}${key}`);
});
exports.getOTP = getOTP;
const deleteOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_client_1.RedisClient.del(email);
});
exports.deleteOTP = deleteOTP;
