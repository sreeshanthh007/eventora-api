import { z } from "zod";

export const updateVendorProfileSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),
  phone: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
  place: z.string().optional(),
  about: z.string().optional(),
});