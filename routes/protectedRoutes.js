import express from "express";
// import getUserInfo controller
import { getUserInfo } from "../controllers/usersControllers.js";
// import verifyToken middleware
import { verifyToken } from "../middleware/verifyToken.js";
// declare express router
const protectedRoute = express.Router();
// create get route to get user info exampleRoute.get("/url", middleware, controller)
protectedRoute.get("/me", verifyToken, getUserInfo);
// export protectedRoute
export default protectedRoute;