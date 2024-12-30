import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
import moment from "moment";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    date: { type: String, default: moment().format("DD-MM-YYYY/HH:mm:ss") },
  },
  { timestamps: true }
);
export default mongoose.model("Task", taskSchema);
