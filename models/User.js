// import mongoose to create model
import mongoose from "mongoose";
// import Schema and Model out of mongoose
import { Schema, model } from "mongoose";

// create new model
const userSchema = new Schema({
  // unique email checks if the email is already in use
    email: { type: String, required: true, unique: true },
    // select to false means that we cant select the password
  password: { type: String, required: true, select: false },
});
// export userSchema
export default model("User", userSchema);