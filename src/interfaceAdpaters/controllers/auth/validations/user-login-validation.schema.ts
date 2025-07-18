import {z} from "zod"
import { emailRegex } from "@shared/validations/email-validation"
import { passwordSchema } from "@shared/validations/password-validation"


export const loginSchema  = z.object({
    email:z
    .string()
    .regex(emailRegex,{message:"Invalid email address"}),
    password:passwordSchema,
    role:z.enum(["admin","client","vendor"])
})