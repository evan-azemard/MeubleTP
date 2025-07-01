import { Schema, model } from "mongoose";
import { v4  } from "uuid";

const CategorySchema = new Schema({
    _id: { type: String, default: () => v4() },
  name: { type: String, required: true, unique: true },
});

export const Category = model("Category", CategorySchema);
