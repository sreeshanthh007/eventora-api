"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const zod_1 = require("zod");
// ✅ Base schema
exports.categorySchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(2, "Title must be at least 2 characters long")
        .max(50, "Title must be less than 50 characters")
        .optional(),
    image: zod_1.z
        .string()
        .optional()
});
