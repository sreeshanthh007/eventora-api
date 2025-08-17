"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ServiceSchema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Vendor", required: true },
    serviceTitle: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    serviceDescription: { type: String, required: true },
    serviceDuration: { type: Number, required: true },
    servicePrice: { type: Number, required: true },
    additionalHourPrice: { type: Number, required: true },
    cancellationPolies: { type: [String], required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    termsAndConditions: { type: [String], required: true },
    status: { type: String, enum: ["active", "blocked"], default: "active" }
}, {
    timestamps: true
});
