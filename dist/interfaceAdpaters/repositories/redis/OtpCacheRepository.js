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
exports.OtpCacheRepository = void 0;
const redis_client_1 = require("@frameworks/cache/redis.client");
class OtpCacheRepository {
    getOtp(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_client_1.RedisClient.get(key);
        });
    }
    saveOtp(key, otp, ttlSec) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_client_1.RedisClient.set(key, otp, { EX: ttlSec });
        });
    }
    deleteOtp(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_client_1.RedisClient.del(key);
        });
    }
}
exports.OtpCacheRepository = OtpCacheRepository;
