import express from "express"
import { userRegisteration } from "./user.controller.js"






const router=express.Router()
router.route("/signUp").post(userRegisteration)


export default router




