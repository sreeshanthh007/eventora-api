
import {z} from "zod"
import { emailRegex } from "interfaceAdapters/validations/email-validation"
import { passwordSchema } from "interfaceAdapters/validations/password-validation"
import { nameSchema } from "interfaceAdapters/validations/name-validation";
import { phoneSchema } from "interfaceAdapters/validations/phone-validation";


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