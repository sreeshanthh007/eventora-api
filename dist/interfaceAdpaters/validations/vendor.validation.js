"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateVendorProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name cannot be empty").optional(),
    phone: zod_1.z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
    place: zod_1.z.string().optional(),
    about: zod_1.z.string().optional(),
});
