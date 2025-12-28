import express from "express"
import cors from "cors"
import userRouter from "./src/features/user/user.routes.js"


const app=express()
app.use(cors())
app.use(express.json())

app.use("/talkmate/api/user",userRouter)




export default app