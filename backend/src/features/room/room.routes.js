import express from "express"
import { roomCreation } from "./room.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const roomRouter = express.Router();
roomRouter.use(authMiddleware)
roomRouter.route("/createRoom").post(roomCreation);


export default roomRouter;