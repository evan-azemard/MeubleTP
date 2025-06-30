import { Schema, model, Types } from "mongoose";
import { v4  } from "uuid";

const FurnitureMaterialUsageSchema = new Schema({
  _id: { type: String, default: () => v4() },
  furniture: { type: Types.ObjectId, ref: "Furniture", required: true },
  material: { type: Types.ObjectId, ref: "Material", required: true },
  quantityUsed: { type: Number, required: true },
});

export const furnitureMaterialUsage = model("furnitureMaterialUsage", FurnitureMaterialUsageSchema);
