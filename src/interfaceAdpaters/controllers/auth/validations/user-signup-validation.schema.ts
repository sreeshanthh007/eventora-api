
import {z} from "zod"
import { emailRegex } from "interfaceAdpaters/validations/email-validation"
import { passwordSchema } from "interfaceAdpaters/validations/password-validation"
import { nameSchema } from "interfaceAdpaters/validations/name-validation";
import { phoneSchema } from "interfaceAdpaters/validations/phone-validation";


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