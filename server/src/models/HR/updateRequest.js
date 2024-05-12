import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const updateReqSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    priority: {
      type: String,
      default: "medium",
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    profile: { type: String },
    password: { type: String },
    location: { type: String },
    employeeID: { type: String },
    isHR: { type: Boolean, default: false },
    lastLogin: { type: String },
    department: { type: String },
    personalInformation: {
      dob: { type: String, default: "" },
      nationality: { type: String, default: "" },
      maritalStatus: { type: String, default: "" },
      bloodGroup: { type: String, default: "" },
      fatherName: { type: String, default: "" },
      placeOfBirth: { type: String, default: "" },
      religion: { type: String, default: "" },
      physicallyChallenged: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);
export default mongoose.model("UpdateRequest", updateReqSchema);
