import { z } from "zod";

const hexString = z.string().refine((val) => val.startsWith("0x"), {
  message: "element should be valid hex string",
});

const address = z
  .string()
  .refine((val) => val.startsWith("0x") && val.length <= 42, {
    message: "address should be valid hex string",
  });

export const InCollect = z.object({
  data: hexString,
  to: address,
  chainId: z.string(),
});

export const Tree = z.object({
  id: z.string(),
  element: hexString,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const InSend = z.object({
  proof: z.string(),
  publicInputs: z.array(z.string()),
  chainId: z.string(),
  withdrawAddress: address,
  nullifiers: z.array(hexString),
});
export const OutSend = z.object({
  txHash: hexString,
});

export type ITree = z.infer<typeof Tree>;

export const OutCollect = z.object({
  txHash: hexString,
});

export type OutCollect = z.infer<typeof OutCollect>;

export type InCollect = {
  body: z.infer<typeof InCollect>;
};

export type InSend = {
  body: z.infer<typeof InSend>;
};

export type OutSend = z.infer<typeof OutSend>;
