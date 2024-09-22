import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const reportBugSchema = new mongoose.Schema(
  {
    userID: {
      type: ObjectId,
      required: true,
    },
    date: { type: String },
    bug: {type: String},
    pageURL: { type: String },
    message: { type: String}
  },
  { timestamps: true }
);
export default mongoose.model("Bug", reportBugSchema);
