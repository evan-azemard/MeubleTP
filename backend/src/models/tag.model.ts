import { Schema, model } from "mongoose";
import { v4  } from "uuid";

const TagSchema = new Schema({
    _id: { type: String, default: () => v4() },
    label: { type: String, required: true, unique: true },
});

export const Tag = model("Tag", TagSchema);
