import mongoose, { model, Schema } from "mongoose";
import { genders } from "../../utils/index.js";
const userSchema = new Schema({
  email: { type: String, minlength: 3, required: true, unique: [true, "Email already exists"], lowercase: true },
  password: { type: String, minlength: 3, required: true },
  userName: { type: String, minlength: 2, required: true, unique: [true, "UserName already exists"] },
  phone: { type: String, required: true, unique: [true, "phone already exists"] },
  gender: {type: String,enum: Object.values(genders)},
},
  {
    timestamps: true,
  }
);

export const User = model("user", userSchema);