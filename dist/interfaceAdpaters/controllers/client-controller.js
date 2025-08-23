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
exports.ClientController = void 0;
const constants_1 = require("@shared/constants");
const tsyringe_1 = require("tsyringe");
let ClientController = class ClientController {
    constructor(_getAllUsersDetailsUseCase, _updateProfileImageUseCase) {
        this._getAllUsersDetailsUseCase = _getAllUsersDetailsUseCase;
        this._updateProfileImageUseCase = _updateProfileImageUseCase;
    }
    refreshSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, role } = req.user;
            if (!id || !role) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_TOKEN });
            }
            const user = yield this._getAllUsersDetailsUseCase.execute(id, role);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, user: user });
        });
    }
    updateProfileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image } = req.body;
            const { id, role } = req.user;
            if (!id || !role) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_TOKEN });
            }
            yield this._updateProfileImageUseCase.execute(id, image, role);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
        });
    }
};
exports.ClientController = ClientController;
exports.ClientController = ClientController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IGetAllUsersDetailsUseCase")),
    __param(1, (0, tsyringe_1.inject)("IUpdateProfileImageUseCase")),
    __metadata("design:paramtypes", [Object, Object])
], ClientController);
