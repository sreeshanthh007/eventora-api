"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorVerificationModel = void 0;
const mongoose_1 = require("mongoose");
const vendor_verification_schema_1 = require("../schemas/vendor-verification.schema");
exports.vendorVerificationModel = (0, mongoose_1.model)("vendorVerification", vendor_verification_schema_1.vendorVerificationSchema);
