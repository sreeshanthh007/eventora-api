
import {z} from "zod"
import { emailRegex } from "@shared/validations/email-validation"
import { passwordSchema } from "@shared/validations/password-validation"
import { nameSchema } from "@shared/validations/name-validation";
import { phoneSchema } from "@shared/validations/phone-validation";


const adminSchema = z.object({
    email:z
    .string()
    .regex(emailRegex,{message:"Invalid email address"}),
    password:passwordSchema,
    role:z.literal("admin")
});


const clientSchema  = z.object({
    name:nameSchema,
    email: z
    .string()
    .regex(emailRegex,{message:"Invalid email address"}),
    phone:phoneSchema,
    password:passwordSchema,
    role:z.literal("client")
});


const vendorSchema = z.object({
    name:nameSchema,
    email:z
    .string()
    .regex(emailRegex,{message:"Invalid email address"}),
    phone:phoneSchema,
    password:passwordSchema,
    role:z.literal("vendor"),
    idProof:z
    .string()
});



export const userSchema = {
    admin:adminSchema,
    client:clientSchema,
    vendor:vendorSchema
}