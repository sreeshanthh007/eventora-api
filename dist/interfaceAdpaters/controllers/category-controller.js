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
exports.CategoryController = void 0;
const custom_error_1 = require("@entities/utils/custom.error");
const constants_1 = require("@shared/constants");
const tsyringe_1 = require("tsyringe");
let CategoryController = class CategoryController {
    constructor(_addCategoryUseCase, _getAllCategoryUseCase, _toggleCategoryUseCase, _getCategoryForServiceUseCase) {
        this._addCategoryUseCase = _addCategoryUseCase;
        this._getAllCategoryUseCase = _getAllCategoryUseCase;
        this._toggleCategoryUseCase = _toggleCategoryUseCase;
        this._getCategoryForServiceUseCase = _getCategoryForServiceUseCase;
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image } = req.body;
            if (!title || !image) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.MISSING_PARAMETERS });
            }
            yield this._addCategoryUseCase.execute(title, image);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.CREATED });
        });
    }
    getAllCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = "10", page = "1", search = "" } = req.query;
            const response = yield this._getAllCategoryUseCase.execute(Number(limit), search, Number(page));
            res.status(constants_1.HTTP_STATUS.OK)
                .json({
                success: true,
                message: "categpry fetched successfully",
                category: response.categories,
                totalPages: response.total
            });
        });
    }
    getCategoryForService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this._getCategoryForServiceUseCase.execute();
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: "category for services fetched", data: categories });
        });
    }
    toogleCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId, status } = req.body;
            console.log("id and stats", categoryId, status);
            if (!categoryId || !status) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.ID_NOT_FOUND, constants_1.HTTP_STATUS.NOT_FOUND);
            }
            if (!["active", "blocked"].includes(status)) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: "status must be active or blocked" });
                return;
            }
            yield this._toggleCategoryUseCase.execute(categoryId);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
        });
    }
};
exports.CategoryController = CategoryController;
exports.CategoryController = CategoryController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IAddCategoryUseCase")),
    __param(1, (0, tsyringe_1.inject)("IGetAllCategoryUseCase")),
    __param(2, (0, tsyringe_1.inject)("IHandleToggleCategoryUseCase")),
    __param(3, (0, tsyringe_1.inject)("IGetCategoriesForServiceUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CategoryController);
