import mongoose from "mongoose";
import moment from "moment";

const loanSchema = new mongoose.Schema({
  loanId: { type: String },
  employeeId: { type: String },
  appliedOn: { type: String },
  loanAmount: { type: Number },
  loanStatus: { type: String, default: "pending" },
  reporter: { type: String },
  repaymentStatus: { type: String, default: "pending" },
  createdOn: {
    type: String,
    default: moment().format("DD-MM-YYYY HH:MM:SS"),
  },
});
export default mongoose.model("Loan", loanSchema);
