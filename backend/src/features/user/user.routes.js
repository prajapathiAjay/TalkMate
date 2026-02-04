import express from "express"
import { userRegisteration,userSignIn } from "./user.controller.js"






const userRouter=express.Router()

userRouter.route("/signUp").post(userRegisteration)
userRouter.route("/signIn").post(userSignIn)






export default userRouter