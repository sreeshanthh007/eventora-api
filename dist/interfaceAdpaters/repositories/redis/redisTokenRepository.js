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
exports.RedisTokenRepository = void 0;
const redis_client_1 = require("@frameworks/cache/redis.client");
class RedisTokenRepository {
    blackListToken(token, expiresIn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_client_1.RedisClient.set(token, "blacklisted", {
                EX: expiresIn,
            });
        });
    }
    isTokenBlacklisted(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield redis_client_1.RedisClient.get(token);
            console.log("is token blacklisted", result);
            return result === "blacklisted";
        });
    }
}
exports.RedisTokenRepository = RedisTokenRepository;
