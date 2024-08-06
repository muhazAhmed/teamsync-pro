import mongoose from "mongoose";
import moment from "moment";

const holidaySchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date },
  createdOn: {
    type: String,
    default: moment().format("DD-MM-YYYY HH:MM:SS"),
  },
});
export default mongoose.model("Holiday", holidaySchema);
