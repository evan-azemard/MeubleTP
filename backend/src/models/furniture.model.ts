import { Schema, model, Types } from "mongoose";
import { v4  } from "uuid";

const FurnitureSchema = new Schema({
    _id: { type: String, default: () => v4() },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 1 },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
});

export const Furniture = model("Furniture", FurnitureSchema);
