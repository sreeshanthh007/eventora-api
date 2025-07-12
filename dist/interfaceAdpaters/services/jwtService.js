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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@shared/config");
const tsyringe_1 = require("tsyringe");
let jwtService = class jwtService {
    constructor() {
        this.jwtSecrect = config_1.config.jwt.JWT_SECRECT_KEY,
            this.accessExpiresIn = config_1.config.jwt.ACCESS_EXPIRES_IN,
            this.refreshExpirenIn = config_1.config.jwt.REFRESH_EXPIRES_IN;
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.jwtSecrect, {
            expiresIn: this.accessExpiresIn
        });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.jwtSecrect, {
            expiresIn: this.refreshExpirenIn
        });
    }
    verifyAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.jwtSecrect);
        }
        catch (error) {
            console.log("error in verifying access token", error);
            return null;
        }
    }
    verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.jwtSecrect);
        }
        catch (error) {
            console.log("error in verifying refresh token", error);
            return null;
        }
    }
    decodeAccessToken(token) {
        try {
            return jsonwebtoken_1.default.decode(token);
        }
        catch (error) {
            console.error("refresh token verification failed", error);
            return null;
        }
    }
};
exports.jwtService = jwtService;
exports.jwtService = jwtService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], jwtService);
