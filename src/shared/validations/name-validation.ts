
import {z} from "zod"

export const nameSchema = z
.string()
 .min(2, { message: "Name must be at least 2 characters long" })
 .max(50, { message: "Name should not contain more than 50 charaters" })
 .regex(/^[a-zA-Z]+$/, {
    message: "Name must contain only alphabetic characters",
  });