import express from  "express";
import { addFriend, getFriends } from "./friend.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";
const friendRouter=express.Router();

friendRouter.use(authMiddleware);

friendRouter.route("/getFriends").get(getFriends)
friendRouter.route("/add").post(addFriend)


export default friendRouter;