import mongoose from "mongoose";

export const DB = (URL) =>
  mongoose
    .connect(URL)
    .then(() => console.log("Database Connection Established"))
    .catch((error) => console.log(error));
