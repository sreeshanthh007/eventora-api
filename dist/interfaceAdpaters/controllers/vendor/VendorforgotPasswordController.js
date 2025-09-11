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
exports.VendorForgotPassword = void 0;
const constants_1 = require("@shared/constants");
const forgotPasswordVendorUseCase_1 = require("@usecases/vendor/forgotPasswordVendorUseCase");
const tsyringe_1 = require("tsyringe");
let VendorForgotPassword = class VendorForgotPassword {
    constructor(vendorUseCase) {
        this.vendorUseCase = vendorUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            yield this.vendorUseCase.update(email, password);
            res.status(constants_1.HTTP_STATUS.OK).json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
            res.status(constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: constants_1.ERROR_MESSAGES.SERVER_ERROR });
        });
    }
};
exports.VendorForgotPassword = VendorForgotPassword;
exports.VendorForgotPassword = VendorForgotPassword = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ForgotVendorUpdatePasswordUseCase")),
    __metadata("design:paramtypes", [forgotPasswordVendorUseCase_1.ForgotVendorUpdatePasswordUseCase])
], VendorForgotPassword);
