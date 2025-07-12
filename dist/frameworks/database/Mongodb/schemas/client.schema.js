"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../../shared/constants");
exports.ClientSchema = new mongoose_1.Schema({
    clientId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: constants_1.ROLES, required: true },
    // profileImage:{type:String},
    status: { type: String, default: "active" },
}, {
    timestamps: true,
});
exports.ClientSchema.index({ status: 1 });
