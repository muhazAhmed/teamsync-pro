import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
import moment from "moment";

const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

const eventsSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    title: { type: String },
    description: { type: String },
    date: { type: Date },
    from: { type: Date },
    to: { type: Date },
    location: { type: String },
    locationDetails: { type: String },
    guests: [guestSchema],
    status: { type: String, default: "pending" },
    createdOn: {
      type: String,
      default: moment().format("DD-MM-YYYY HH:MM:SS"),
    },
  }
);
export default mongoose.model("Event", eventsSchema);
