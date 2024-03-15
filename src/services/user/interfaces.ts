import { z } from "zod";

export const User = z.object({
  id: z.string(),
  nonce: z.number().default(0),
  address: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type IUser = z.infer<typeof User>;