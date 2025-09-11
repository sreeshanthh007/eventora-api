"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinarySignatureService = void 0;
const cloudinary_1 = require("cloudinary");
const tsyringe_1 = require("tsyringe");
const config_1 = require("@shared/config");
if (!config_1.config.cloudinary.apiKey ||
    !config_1.config.cloudinary.apiSecret ||
    !config_1.config.cloudinary.cloudName) {
    throw new Error("Cloudinary env has some missings in config file");
}
cloudinary_1.v2.config({
    cloud_name: config_1.config.cloudinary.cloudName,
    api_key: config_1.config.cloudinary.apiKey,
    api_secret: config_1.config.cloudinary.apiSecret
});
let CloudinarySignatureService = class CloudinarySignatureService {
    generateSignature(folder) {
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = cloudinary_1.v2.utils.api_sign_request({ timestamp, folder }, config_1.config.cloudinary.apiSecret);
        return {
            timestamp,
            signature,
            folder,
            apiKey: config_1.config.cloudinary.apiKey,
            cloudName: config_1.config.cloudinary.cloudName
        };
    }
};
exports.CloudinarySignatureService = CloudinarySignatureService;
exports.CloudinarySignatureService = CloudinarySignatureService = __decorate([
    (0, tsyringe_1.injectable)()
], CloudinarySignatureService);
