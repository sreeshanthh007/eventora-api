"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const category_schema_1 = require("../schemas/category.schema");
exports.categoryModel = (0, mongoose_1.model)("Category", category_schema_1.CategorySchema);
