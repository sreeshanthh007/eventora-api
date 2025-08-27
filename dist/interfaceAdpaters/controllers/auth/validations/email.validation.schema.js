"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerifySchema = void 0;
const zod_1 = require("zod");
const email_validation_1 = require("interfaceAdpaters/validations/email-validation");
exports.emailVerifySchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(email_validation_1.emailRegex, { message: "Invalid email address" }),
    otp: zod_1.z
        .string()
        .length(6, { message: "OTP must be exactly 6 digits" })
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
});
