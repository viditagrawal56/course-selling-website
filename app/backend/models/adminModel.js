import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { required: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
