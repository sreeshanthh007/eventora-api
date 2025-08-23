"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileImageSchema = exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    phone: zod_1.z.string().min(10).max(15).optional()
});
exports.updateProfileImageSchema = zod_1.z.object({
    image: zod_1.z.string(),
});
