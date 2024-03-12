import mongoose from "mongoose";
const hrSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    profile: { type: String },
    password: { type: String },
    location: { type: String},
    companyEmail:{ type: String },
    employeeID: { type: String },
    isHR: { type: Boolean, default: true },
    lastLogin: { type: String},
    personalInformation: [
      {
        dob: {type: String},
        nationality: {type: String},
        maritalStatus: {type: String},
        bloodGroup: {type: String},
        fatherName: {type: String},
        placeOfBirth: {type: String},
        religion: {type: String},
        physicallyChallenged: {type: Boolean},
      }
    ],
    employment: [
      {
        department: {type: String},
        designation: {type: String},
        location: {type: String},
        startDate: {type: String},
        reportingManager: {type: String},
        ctc: {type: Number},
        status: {type: Boolean}
      }
    ]
  },
  { timestamps: true }
);
export default mongoose.model("HR", hrSchema);
