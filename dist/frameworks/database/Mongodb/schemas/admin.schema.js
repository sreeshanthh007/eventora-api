"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
exports.adminSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "admin" }
}, {
    timestamps: true
});
