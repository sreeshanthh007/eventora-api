"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    categoryId: { type: String, required: true, unique: true },
    status: { type: String, default: "active" },
    title: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});
exports.CategorySchema.index({ status: 1 });
