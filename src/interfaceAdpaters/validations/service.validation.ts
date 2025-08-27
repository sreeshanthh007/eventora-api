import {z} from "zod"

export const ServiceValidationSchema = z.object({
  serviceTitle: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must not exceed 100 characters" })
    .nonempty({ message: "Service title is required" }),

  yearsOfExperience: z
    .number({ invalid_type_error: "Years of experience must be a number" })
    .min(0, { message: "Years of experience cannot be negative" })
    .max(50, { message: "Years of experience cannot exceed 50" }),

  serviceDescription: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(1000, { message: "Description must not exceed 1000 characters" })
    .nonempty({ message: "Description is required" }),

  servicePrice: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price cannot be negative" }),

  additionalHourPrice: z
    .number({ invalid_type_error: "Additional hour price must be a number" })
    .min(0, { message: "Additional hour price cannot be negative" }),

cancellationPolicies: z
  .array(
    z
      .string()
      .min(20, "Each cancellation policy must be at least 20 characters")
      .max(2000, "Each cancellation policy cannot exceed 2000 characters")
      .nonempty("Cancellation policy cannot be empty")
  )
  .min(1, "At least one cancellation policy is required"),
    termsAndConditions:z
    .array(
        z
        .string()
        .min(20, "Each cancellation policy must be at least 20 characters")
        .max(2000, "Each cancellation policy cannot exceed 2000 characters")
        .nonempty("Cancellation policy cannot be empty")
    ),
    serviceDuration:z
    .number(),
  categoryId: z
    .string()
    .nonempty({ message: "Service category is required" }),
});




export const EditServiceValidationSchema = z.object({
  serviceTitle: z.string().min(3).max(100).optional(),
  serviceDescription: z.string().min(20).max(1000).optional(),
  servicePrice: z.number().min(1).optional(),
  additionalHourPrice: z.number().min(0).optional(),
  cancellationPolicies: z.array(z.string().min(20).max(2000)).optional(),
  termsAndConditions: z.array(z.string().min(20).max(2000)).optional(),
  serviceDuration: z.number().optional(),
  categoryId: z.string().optional(),
});