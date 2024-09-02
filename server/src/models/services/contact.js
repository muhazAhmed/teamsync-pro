import mongoose from "mongoose";
import moment from "moment";

const contactSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  status: {type: String, default: "pending" },
  sentOn: {
    type: String,
    default: moment().format("DD-MM-YYYY HH:MM:SS"),
  },
});
export default mongoose.model("Contact", contactSchema);
