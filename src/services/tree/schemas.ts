import { InHeaders } from "../auth/interfaces";
import { InCollect, OutCollect } from "./interfaces";

export const Collect = {
  description: "Used to Collect funds from stealth address to pool",
  tags: ["Tree"],
  summary: "",
  headers: InHeaders,
  body: InCollect,
  response: {
    200: OutCollect,
  },
};
