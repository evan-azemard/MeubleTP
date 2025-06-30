import { Schema, model, Types } from "mongoose";
import { v4  } from "uuid";

const FurnitureTagAssignmentSchema = new Schema({
  _id: { type: String, default: () => v4() },
  furniture: { type: Types.ObjectId, ref: "Furniture", required: true },
  tag: { type: Types.ObjectId, ref: "Tag", required: true },
});

export const FurnitureTagAssignment = model("FurnitureTagAssignment", FurnitureTagAssignmentSchema);
