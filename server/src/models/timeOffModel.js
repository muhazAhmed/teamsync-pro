import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
import moment from "moment";

const timeOffSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    date: { type: String, default: moment().format("DD-MM-YYYY/HH:mm:ss") },
    leaveType: { type: String, default: "normal" },
    from: { type: String },
    to: { type: String },
    reason: { type: String, default: "NA" },
    reportingManager: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);
export default mongoose.model("LeaveRequest", timeOffSchema);
