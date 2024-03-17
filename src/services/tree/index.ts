import * as Controller from "./controllers";
import * as Schemas from "./schemas";

import { RouteOptions } from "fastify";

export const Collect = {
  method: "POST",
  url: "/api/collect",
  handler: Controller.Collect,
  schema: Schemas.Collect,
} as RouteOptions;
