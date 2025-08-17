"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.CategoryRepository = void 0;
const category_model_1 = require("@frameworks/database/Mongodb/models/category.model");
const tsyringe_1 = require("tsyringe");
let CategoryRepository = class CategoryRepository {
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.categoryModel.findOne({ title });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.categoryModel.findById(id);
        });
    }
    findByIDAndUpdateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield category_model_1.categoryModel.findByIdAndUpdate(id, { $set: { status: status } });
        });
    }
    save(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.categoryModel.create(category);
        });
    }
    findPaginatedCategory(filter, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const [categories, total] = yield Promise.all([
                category_model_1.categoryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
                category_model_1.categoryModel.countDocuments(filter),
            ]);
            return {
                categories,
                total
            };
        });
    }
    findCategoryForClients() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.categoryModel.find({ status: "active" });
        });
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, tsyringe_1.injectable)()
], CategoryRepository);
