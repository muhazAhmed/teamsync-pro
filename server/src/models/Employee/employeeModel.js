import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema(
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
    isHR: { type: Boolean, default: false },
    lastLogin: { type: String},
    personalInformation: {
        dob: {type: String, default: ""},
        nationality: {type: String, default: ""},
        maritalStatus: {type: String, default: ""},
        bloodGroup: {type: String, default: ""},
        fatherName: {type: String, default: ""},
        placeOfBirth: {type: String, default: ""},
        religion: {type: String, default: ""},
        physicallyChallenged: {type: Boolean, default: false},
      },
    employment: {
        department: {type: String, default: ""},
        designation: {type: String, default: ""},
        workLocation: {type: String, default: ""},
        startDate: {type: String, default: ""},
        reportingManager: {type: String, default: ""},
        ctc: {type: Number, default: 0},
        status: {type: Boolean, default: true}
      }
  },
  { timestamps: true }
);
export default mongoose.model("Employee", employeeSchema);
