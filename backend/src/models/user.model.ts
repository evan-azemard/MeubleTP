import { Schema, model } from "mongoose";
import { v4  } from "uuid";

const UserSchema = new Schema({
    _id: { type: String, default: () => v4() },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const User = model("User", UserSchema);
