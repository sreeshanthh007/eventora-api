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
exports.HandleToggleStatus = void 0;
const constants_1 = require("@shared/constants");
const tsyringe_1 = require("tsyringe");
let HandleToggleStatus = class HandleToggleStatus {
    constructor(ToggleStatusUseCase) {
        this.ToggleStatusUseCase = ToggleStatusUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, status } = req.body;
                if (!userId || !status) {
                    res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                        success: false,
                        message: "userId and status are required"
                    });
                    return;
                }
                if (!['active', 'blocked'].includes(status)) {
                    res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                        success: false,
                        message: "Status must be either 'active' or 'blocked'"
                    });
                    return;
                }
                yield this.ToggleStatusUseCase.execute(userId, status);
                res.status(constants_1.HTTP_STATUS.OK).json({
                    success: true,
                    message: `User status updated to ${status}`,
                    data: { userId, status }
                });
            }
            catch (error) {
                console.error("Error in HandleToggleStatus:", error);
                res.status(constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Failed to update user status"
                });
            }
        });
    }
};
exports.HandleToggleStatus = HandleToggleStatus;
exports.HandleToggleStatus = HandleToggleStatus = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IUserToggleStatusUseCase")),
    __metadata("design:paramtypes", [Object])
], HandleToggleStatus);
