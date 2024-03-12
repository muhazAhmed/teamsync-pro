import mongoose from "mongoose";
const clientSchema = new mongoose.Schema(
  {
    page_id: { type: String },
    pageName: { type: String },
  },
  { timestamps: true }
);
export default mongoose.model("Client", clientSchema);
