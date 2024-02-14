import mongoose from "mongoose";
const testingSchema = new mongoose.Schema(
  {
    message: { type: String, default: "Database has Been Already Connected..." },
  },
  { timestamps: true }
);
export default mongoose.model("Testing", testingSchema);