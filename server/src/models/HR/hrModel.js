import mongoose from "mongoose";
const hrSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    profile: { type: String },
    password: { type: String },
    isHR: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default mongoose.model("HR", hrSchema);
