

import {z} from "zod"

export const updateProfileSchema  = z.object({
    name:z.string().min(2).optional(),
    phone:z.string().min(10).max(15).optional()
})


  export const updateProfileImageSchema = z.object({
    image: z.string(),
  })