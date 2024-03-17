import { InHeaders } from "../auth/interfaces";
import { InCollect, InSend, OutCollect, OutSend } from "./interfaces";

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

export const Send = {
  description: "Used to send funds from pool to recipient address",
  tags: ["Tree"],
  summary: "",
  headers: InHeaders,
  body: InSend,
  response: {
    200: OutSend,
  },
};
