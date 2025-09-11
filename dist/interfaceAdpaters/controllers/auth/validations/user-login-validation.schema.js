"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
const email_validation_1 = require("interfaceAdpaters/validations/email-validation");
const password_validation_1 = require("interfaceAdpaters/validations/password-validation");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(email_validation_1.emailRegex, { message: "Invalid email address" }),
    password: password_validation_1.passwordSchema,
    role: zod_1.z.enum(["admin", "client", "vendor"])
});
