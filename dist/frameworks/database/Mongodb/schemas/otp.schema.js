"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OtpSchema = new mongoose_1.Schema({
    otp: { type: String, required: true },
    email: { type: String },
    expiresAt: { type: Date, required: true, expires: 60 }
}, {
    timestamps: true
});
