import mongoose from "mongoose";

// connect mongoose with trycatch block and .connect
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Successfully connected to database");
} catch (error) {
  console.log(error);
}
