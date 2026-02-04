import express from "express"
 import { roomCreation } from "./room.controller";
import { authMiddleware } from "../../middlewares/auth";

const router=express.Router();
router.use(authMiddleware)
router.route("/createRoom").post(roomCreation);