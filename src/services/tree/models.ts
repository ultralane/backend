import { Schema, model, models } from "mongoose";
import { INullifiers } from "./interfaces";
import Plugins from "../../plugins";

export const NullifiersSchema = new Schema<INullifiers>(
  {
    element: { type: String, required: true, index: true, unique: true },
  },
  Plugins.Mongo.Normalize()
);

export const Nullifiers =
  models?.Nullifiers ?? model<INullifiers>("Nullifiers", NullifiersSchema);
