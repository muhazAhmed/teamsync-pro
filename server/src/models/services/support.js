import mongoose from "mongoose";
import moment from "moment";

const supportSchema = new mongoose.Schema(
  {
    userId: { type: String },
    priority: { type: String },
    subject: { type: String },
    description: { type: String },
    date: {type: String, default: moment().format("DD-MM-YYYY")},
    reportingManager: { type: String }
  },
  { timestamps: true }
);
export default mongoose.model("Support", supportSchema);
