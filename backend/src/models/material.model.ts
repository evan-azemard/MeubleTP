import { Schema, model, Types } from "mongoose";
import { v4  } from "uuid";

const MaterialSchema = new Schema({
    _id: { type: String, default: () => v4() },
    name: { type: String, required: true },
    type: { type: String, required: true },
    company: { type: Types.ObjectId, ref: "Company", required: true },
});

export const Material = model("Material", MaterialSchema);
