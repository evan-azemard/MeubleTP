import { Schema, model } from "mongoose";
import { v4  } from "uuid";

const CompanySchema = new Schema({
    _id: { type: String, default: () => v4() },
    name: { type: String, required: true, unique: true },
});

export const Company = model("Company", CompanySchema);
