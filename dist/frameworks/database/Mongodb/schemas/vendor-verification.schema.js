"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorVerificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.vendorVerificationSchema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Vendor", required: true },
    businessName: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    place: { type: String, required: true },
    contactNumber: { type: String, required: true },
    idProof: { type: String, required: true },
    status: { type: String, enum: ["pending", "rejected", "approved"], default: "pending" },
    rejectionReason: { type: String, required: true },
    verifiedAt: { type: Date },
}, {
    timestamps: true
});
