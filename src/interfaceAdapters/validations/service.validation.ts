import {z} from "zod"




export const ServiceValidationSchema = z.object({
  serviceTitle: z.string().nonempty("Service title is required"),
  serviceDescription: z.string().nonempty("Service description is required"),
  servicePrice: z.number().positive("Service price must be positive"),
  yearsOfExperience: z.number().min(0, "Years of experience must be valid"),
  serviceDuration: z.number().positive("Service duration must be positive"),
  additionalHourPrice: z.number().min(0, "Additional hour price must be valid"),
  categoryId: z.string().nonempty("Category is required"),

  cancellationPolicies: z.array(z.string()).default([]),
  termsAndConditions: z.array(z.string()).default([]),
  holidays: z.array(z.coerce.date()).default([]),


  schedule: z.object({
    frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "ONCE"]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
    duration: z.number().positive("Duration must be positive"),
    capacity: z.number().positive("Capacity is required"),
    bookedCount: z.number().optional(),
    workingDays: z.array(z.number()).optional(),
  }),
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
  schedule: 
      z.object({
        frequency: z.enum(["ONCE", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
        startDate: z.string(), 
        endDate: z.string(),
        startTime: z.string(), 
        endTime: z.string(),
        duration: z.number().min(1),
        capacity: z.number().min(1),
        workingDays: z.array(z.number().min(0).max(6)).optional(), 
        holidays: z.array(z.string()).optional()
      })
    .optional(),
});




export const RRuleServiceValidationSchema = z.object({
  vendorId: z
    .string()
    .nonempty({ message: "Vendor ID is required" }),

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
    .max(2000, { message: "Description must not exceed 2000 characters" })
    .nonempty({ message: "Service description is required" }),

  serviceDuration: z
    .number({ invalid_type_error: "Service duration must be a number" })
    .min(1, { message: "Service duration must be at least 1 hour" }),

  servicePrice: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price cannot be negative" }),

  additionalHourPrice: z
    .number({ invalid_type_error: "Additional hour price must be a number" })
    .min(0, { message: "Additional hour price cannot be negative" }),

  cancellationPolicies: z
    .array(
      z.string()
        .min(20, { message: "Each policy must be at least 20 characters" })
        .max(2000, { message: "Each policy cannot exceed 2000 characters" })
    )
    .min(1, { message: "At least one cancellation policy is required" }),

  termsAndConditions: z
    .array(
      z.string()
        .min(20, { message: "Each term must be at least 20 characters" })
        .max(2000, { message: "Each term cannot exceed 2000 characters" })
    )
    .min(1, { message: "At least one term and condition is required" }),

  categoryId: z
    .string()
    .nonempty({ message: "Service category is required" }),

  status: z
    .enum(["active", "blocked"])
    .default("active"),

  holidays: z
    .array(z.coerce.date({ invalid_type_error: "Invalid date format" }))
    .optional(),

  capacity: z
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(1, { message: "Capacity must be at least 1" })
    .optional(),

  // 🔥 Schedule (instead of slots)
  schedule: z
    .array(
      z.object({
        frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "ONCE"], {
          required_error: "Frequency is required",
        }),

        startDate: z
          .string()
          .nonempty("Start date is required")
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid start date format",
          }),

        endDate: z
          .string()
          .optional()
          .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Invalid end date format",
          }),

        startTime: z
          .string()
          .nonempty("Start time is required")
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "Invalid start time format (HH:mm)",
          }),

        endTime: z
          .string()
          .nonempty("End time is required")
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "Invalid end time format (HH:mm)",
          }),

        duration: z
          .number({ invalid_type_error: "Duration must be a number" })
          .min(1, { message: "Duration must be at least 1 hour" }),

        workingDays: z
          .array(z.number().min(0).max(6))
          .optional()
          .refine(
            (days) => !days || days.every((d) => d >= 0 && d <= 6),
            { message: "Working days must be between 0 (Sunday) and 6 (Saturday)" }
          ),

        timezone: z
          .string()
          .optional()
          .default("Asia/Kolkata"),

        rrule: z.string().optional(),
      })
      .refine(
        (data) => {
          if (data.endDate) {
            return new Date(data.endDate) >= new Date(data.startDate);
          }
          return true;
        },
        { message: "End date must be after start date", path: ["endDate"] }
      )
    )
    .min(1, { message: "At least one schedule is required" }),
});
