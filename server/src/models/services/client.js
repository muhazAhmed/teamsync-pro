import mongoose from "mongoose";
import moment from "moment";

const clientSchema = new mongoose.Schema(
  {
    email: { type: String },
    newsLetter: { type: Boolean, default: false },
    date: { type: String, default: moment().format("DD-MM-YYYY") },
    isRegisteredUser: { type: Boolean, default: false },
    employeeId: {type: String, default: "NA"}
  },
  { timestamps: true }
);
export default mongoose.model("Client", clientSchema);
