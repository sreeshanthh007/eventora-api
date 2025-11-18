
import {z} from "zod"


export const passwordSchema = z
.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[0-9]/,{message:"Password must contain at least one digit"})
  .regex(/[A-Z]/,{message:"Password must contain at leasst one uppercase letter"})
   .regex(/[@$!%*?&]/, {
    message: "Password must contain at least one special character",
  });




  export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is too short"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
     .regex(/[0-9]/,{message:"Password must contain at least one digit"})
     .regex(/[A-Z]/,{message:"Password must contain at leasst one uppercase letter"}),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  })
  .refine((data) => (data.newPassword ? data.newPassword === data.currentPassword : true), {
    message: "New password does not Old new password",
    path: ["newPassword"],
  });