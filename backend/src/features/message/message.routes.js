import express from "express";
import { authMiddleware } from "../../middlewares/auth.js";
import { getMessage } from "./message.controller.js";


const messageRouter=express.Router();
messageRouter.use(authMiddleware);
messageRouter.route("/getMessages").get(getMessage)

export default messageRouter;
