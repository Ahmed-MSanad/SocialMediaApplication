import { model, Schema } from "mongoose";
import { genders } from "../../utils/index.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      minlength: 3,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: true,
    },
    fullName:{
      type: String,
      minlength: 2,
      required: true,
      unique: [true, "UserName already exists"],
    },
    password: { 
      type: String, 
      minlength: 6, 
      required: true 
    },
    phone: {
      type: String,
      required: true,
      unique: [true, "phone already exists"],
    },
    gender: { 
      type: String, 
      enum: Object.values(genders) 
    },
    profilePicture:{
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
