
import {z} from "zod"

import { emailRegex } from "interfaceAdpaters/validations/email-validation"

export const emailVerifySchema = z.object({
    email:z
    .string()
    .regex(emailRegex,{message:"Invalid email address"}),
    otp:z
    .string()
    .length(6,{message:"OTP must be exactly 6 digits"})
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
})