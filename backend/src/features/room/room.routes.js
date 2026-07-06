import express from "express"
import { roomCreation,getRoomData, roomDatawithseen } from "./room.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";


const roomRouter = express.Router();
roomRouter.use(authMiddleware)
roomRouter.route("/createRoom").post(roomCreation);
roomRouter.route("/").get(getRoomData)
roomRouter.route("/private").get(roomDatawithseen)


export default roomRouter;