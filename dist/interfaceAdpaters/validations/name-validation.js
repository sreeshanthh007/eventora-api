"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameSchema = void 0;
const zod_1 = require("zod");
exports.nameSchema = zod_1.z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name should not contain more than 50 characters" })
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message: "Name must contain only letters and single spaces",
});
