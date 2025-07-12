"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
const email_validation_1 = require("@shared/validations/email-validation");
const password_validation_1 = require("@shared/validations/password-validation");
const name_validation_1 = require("@shared/validations/name-validation");
const phone_validation_1 = require("@shared/validations/phone-validation");
const adminSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(email_validation_1.emailRegex, { message: "Invalid email address" }),
    password: password_validation_1.passwordSchema,
    role: zod_1.z.literal("admin")
});
const clientSchema = zod_1.z.object({
    name: name_validation_1.nameSchema,
    email: zod_1.z
        .string()
        .regex(email_validation_1.emailRegex, { message: "Invalid email address" }),
    phone: phone_validation_1.phoneSchema,
    password: password_validation_1.passwordSchema,
    role: zod_1.z.literal("client")
});
const vendorSchema = zod_1.z.object({
    name: name_validation_1.nameSchema,
    email: zod_1.z
        .string()
        .regex(email_validation_1.emailRegex, { message: "Invalid email address" }),
    phone: phone_validation_1.phoneSchema,
    password: password_validation_1.passwordSchema,
    role: zod_1.z.literal("vendor")
});
exports.userSchema = {
    admin: adminSchema,
    client: clientSchema,
    vendor: vendorSchema
};
