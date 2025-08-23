
import {z} from "zod"


export const passwordSchema = z
.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[0-9]/,{message:"Password must contain at least one digit"})
  .regex(/[A-Z]/,{message:"Password must contain at leasst one uppercase letter"})
   .regex(/[@$!%*?&]/, {
    message: "Password must contain at least one special character",
  });