// import dotenv
import "dotenv/config.js"; // in this pkg there is dotenv/config.js, we import it so index.js knows about it
// import express
import express from "express";
// import mongoose
import "./db/mongoose.js";
// import cors
import cors from "cors";
// import users router
import users from "./routes/users.js";
// import protectedRoute
import protectedRoute from "./routes/protectedRoutes.js";
// call express to initiate express app
const app = express();
// call port
const port = process.env.PORT || 5000;

// cors options
//with origin we allow only access from react_app_uri
// with exposedHeaders we can give access to the frontend of parts of the headers eg. "Authorisation"
// we need access to the header cause we will send the token in the header
const corsOptions = {
  origin: process.env.PEACT_APP_URI,
  exposedHeaders: "Authorisation",
};

// call middleware cors on app and pass options as argument
app.use(cors(corsOptions));
// express.json we need to work with the body
app.use(express.json());
// we built our routes into middleware
// is taking authentication
app.use("/user", users);
// is taking care of the authorisation
app.use("/info", protectedRoute);
// call listener function
app.listen(port, () => console.log(`Server is running on ${port}`));
