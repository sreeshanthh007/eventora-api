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
exports.VendorRegisterStrategy = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("@entities/utils/custom.error");
const randomid_bcrypt_1 = require("@frameworks/security/randomid.bcrypt");
const constants_1 = require("@shared/constants");
let VendorRegisterStrategy = class VendorRegisterStrategy {
    constructor(vendorRepository, passwordBcrypt) {
        this.vendorRepository = vendorRepository;
        this.passwordBcrypt = passwordBcrypt;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role == "vendor") {
                const existingVendor = yield this.vendorRepository.findByEmail(user.email);
                if (existingVendor) {
                    throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.EMAIL_EXISTS, constants_1.HTTP_STATUS.CONFLICT);
                }
                const { name, email, phone, password, } = user;
                let hashedPassword = null;
                if (password) {
                    hashedPassword = yield this.passwordBcrypt.hash(password);
                }
                const vendorId = (0, randomid_bcrypt_1.generateRandomUUID)();
                const vendor = yield this.vendorRepository.save({
                    name,
                    email,
                    phone,
                    password: hashedPassword !== null && hashedPassword !== void 0 ? hashedPassword : "",
                    vendorId,
                    role: "vendor"
                });
                return vendor;
            }
            else {
                throw new custom_error_1.CustomError("Invalid role for vendor request", constants_1.HTTP_STATUS.BAD_REQUEST);
            }
        });
    }
};
exports.VendorRegisterStrategy = VendorRegisterStrategy;
exports.VendorRegisterStrategy = VendorRegisterStrategy = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IVendorRepository")),
    __param(1, (0, tsyringe_1.inject)("IPasswordBcrypt")),
    __metadata("design:paramtypes", [Object, Object])
], VendorRegisterStrategy);
