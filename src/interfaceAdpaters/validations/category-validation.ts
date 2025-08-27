import { z } from "zod";

// ✅ Base schema
export const categorySchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters long")
    .max(50, "Title must be less than 50 characters")
    .optional(),
  image: z
    .string()
    .optional()
});