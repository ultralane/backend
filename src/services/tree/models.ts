import { Schema, model, models } from "mongoose";
import { ITree } from "./interfaces";
import Plugins from "../../plugins";

export const TreeSchema = new Schema<ITree>(
  {
    element: { type: String, required: true, index: true, unique: true },
  },
  Plugins.Mongo.Normalize()
);

export const Tree = models?.Tree ?? model<ITree>("Tree", TreeSchema);