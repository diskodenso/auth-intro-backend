// import express
import express from "express";
// import signUp and logIn
import { signUp, logIn } from "../controllers/usersControllers.js";
// import verifyToken
import { verifyToken } from "../middleware/verifyToken.js";
// import verifySession 
import { verifySession } from "../controllers/usersControllers.js";
// declare router
const users = express.Router();

// create routes
// create singup route with post request - we send a formular to the server to create new userdata
users.post("/signup", signUp);
// create login route with post cause we send the credentials to the server to check
users.post("/login", logIn);
// create a verify route with get cause we want to get the right token back and we use middleware verifyToken
// this endpoint we use to check if the user is still signed in
users.get("/verify", verifyToken, verifySession);

export default users;