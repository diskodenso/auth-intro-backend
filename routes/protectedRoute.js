// import express
import express from "express";
// import getUserInfo controller
// import verifyToken middleware

// declare route
const protectedRouter = express.Router();

// create route to get user info exampleRoute.get("/url", middleware, controller)
protectedRouter.get("/me", verifyToken, getUserInfo)