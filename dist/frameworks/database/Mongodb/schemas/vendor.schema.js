"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../../shared/constants");
exports.VendorSchema = new mongoose_1.Schema({
    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: constants_1.ROLES, required: true, default: "vendor" },
    profilePicture: { type: String },
    phone: { type: String },
    about: { type: String },
    idProof: { type: String, required: true },
    place: { type: String },
    fcmToken: { type: String },
    rejectionReason: { type: String, required: false },
    status: { type: String, default: "active" },
    vendorStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, {
    timestamps: true
});
exports.VendorSchema.index({ status: 1 });
