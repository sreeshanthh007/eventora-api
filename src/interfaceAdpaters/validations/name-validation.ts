
import {z} from "zod"

export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(50, { message: "Name should not contain more than 50 characters" })
  .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message: "Name must contain only letters and single spaces",
  });