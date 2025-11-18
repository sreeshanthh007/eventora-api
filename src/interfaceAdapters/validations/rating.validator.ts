
import {z} from "zod"


export const ratingValidateSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description is too long (max 1000 chars)" }),
  rating: z
    .number()
    .int({ message: "Rating must be an integer" })
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
    serviceId:z
    .string()
});
export const EditratingValidateSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description is too long (max 1000 chars)" }),
  rating: z
    .number()
    .int({ message: "Rating must be an integer" })
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
});