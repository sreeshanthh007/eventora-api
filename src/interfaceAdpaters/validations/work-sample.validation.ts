
import { z } from "zod";

export const workSampleSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  images: z.array(z.string()).min(1).max(10),
});

