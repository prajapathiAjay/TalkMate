import express from "express"
import { userRegisteration,userSignIn } from "./user.controller.js"






const router=express.Router()
router.route("/signUp").post(userRegisteration)
router.route("/signIn").post(userSignIn)

export default router




