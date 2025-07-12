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
exports.registerUserController = void 0;
const tsyringe_1 = require("tsyringe");
const user_signup_validation_schema_1 = require("./validations/user-signup-validation.schema");
const constants_1 = require("@shared/constants");
let registerUserController = class registerUserController {
    constructor(registerUserCases) {
        this.registerUserCases = registerUserCases;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role } = req.body;
            const schema = user_signup_validation_schema_1.userSchema[role];
            if (!schema) {
                res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS });
                return;
            }
            const validateData = schema.parse(req.body);
            yield this.registerUserCases.execute(validateData);
            res.status(constants_1.HTTP_STATUS.CREATED).json({
                success: true,
                message: constants_1.SUCCESS_MESSAGES.REGISTERATION_SUCCESS,
            });
        });
    }
};
exports.registerUserController = registerUserController;
exports.registerUserController = registerUserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRegisterUseCase")),
    __metadata("design:paramtypes", [Object])
], registerUserController);
