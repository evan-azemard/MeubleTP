import { Schema, model, Types } from "mongoose";
import { v4 } from "uuid";

const FurnitureSchema = new Schema({
  _id: { type: String, default: () => v4() },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  quantity: { type: Number, default: 1 },
  category: { type: String, ref: "Category", required: true },
  createdBy: { type: String, ref: "User", required: true },
  materials: [{
    materialId: { type: String, ref: "Material", required: true },
    quantityUsed: { type: Number, required: true }
  }],
  tags: [{ type: String, ref: "Tag" }]
});

export const Furniture = model("Furniture", FurnitureSchema);
