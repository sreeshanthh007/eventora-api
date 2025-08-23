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
exports.VendorController = void 0;
const custom_error_1 = require("@entities/utils/custom.error");
const constants_1 = require("@shared/constants");
const tsyringe_1 = require("tsyringe");
let VendorController = class VendorController {
    constructor(_approveVendorUseCase, _getAllVendorsUseCase, _requestedVendorUseCase, _updateVendorAccountStatusUseCase, _rejectVendorUseCase, _resendVerificationUseCase) {
        this._approveVendorUseCase = _approveVendorUseCase;
        this._getAllVendorsUseCase = _getAllVendorsUseCase;
        this._requestedVendorUseCase = _requestedVendorUseCase;
        this._updateVendorAccountStatusUseCase = _updateVendorAccountStatusUseCase;
        this._rejectVendorUseCase = _rejectVendorUseCase;
        this._resendVerificationUseCase = _resendVerificationUseCase;
    }
    approveVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendorId = req.params.vendorId;
            if (!vendorId) {
                res
                    .status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.ID_NOT_FOUND });
            }
            yield this._approveVendorUseCase.execute(vendorId);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
        });
    }
    rejectVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendorId = req.params.vendorId;
            const { rejectReason } = req.body;
            if (!vendorId) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.ID_NOT_FOUND, constants_1.HTTP_STATUS.NOT_FOUND);
            }
            yield this._rejectVendorUseCase.execute(vendorId, rejectReason);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: "rejected successfully" });
        });
    }
    getAllVendors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = "10", page = "1", search = "", } = req.query;
            const response = yield this._getAllVendorsUseCase.execute(Number(limit), search, Number(page));
            res.status(constants_1.HTTP_STATUS.OK).json({
                success: true,
                message: "vendors fetched successfully",
                vendors: response.user,
                totalPages: response.total,
            });
        });
    }
    resendVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendorId = req.params.vendorId;
            if (!vendorId) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.ID_NOT_FOUND });
            }
            yield this._resendVerificationUseCase.execute(vendorId);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: "verification resend successfully" });
        });
    }
    getRequestedVendors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = "1", limit = "10", search = "", } = req.query;
            const response = yield this._requestedVendorUseCase.execute(Number(limit), search, Number(page));
            res.status(constants_1.HTTP_STATUS.OK).json({
                success: true,
                message: "requested vendors fetched successfully",
                vendors: response.vendors,
                totalPages: response.total,
            });
        });
    }
    udpateVendorAccountStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vendorId, status } = req.body;
            if (!vendorId || !status) {
                res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "userId and status are required",
                });
                return;
            }
            if (!["active", "blocked"].includes(status)) {
                res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Status must be either 'active' or 'blocked'",
                });
            }
            yield this._updateVendorAccountStatusUseCase.execute(vendorId, status);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
            return;
        });
    }
};
exports.VendorController = VendorController;
exports.VendorController = VendorController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IApproveVendorUseCase")),
    __param(1, (0, tsyringe_1.inject)("IGetAllVendorsUseCase")),
    __param(2, (0, tsyringe_1.inject)("IGetRequestedVendorUseCase")),
    __param(3, (0, tsyringe_1.inject)("IHandleToggleVendorUseCase")),
    __param(4, (0, tsyringe_1.inject)("IRejectVendorUseCase")),
    __param(5, (0, tsyringe_1.inject)("IResendVerificationUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], VendorController);
