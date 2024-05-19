import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    date: { type: String},
    note: { type: String, default: "" },
    firstSwipe: { type: String, default: "" },
    secondSwipe: { type: String, default: "" },
    thirdSwipe: { type: String, default: "" },
    fourthSwipe: { type: String, default: "" },
    status: { type: Boolean, default: false},
  },
  { timestamps: true }
);
export default mongoose.model("Attendance", attendanceSchema);
