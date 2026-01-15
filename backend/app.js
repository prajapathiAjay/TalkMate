import express from "express"
import cors from "cors"
import userRouter from "./src/features/user/user.routes.js"
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js"

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)

// 👇 VERY IMPORTANT (handles preflight requests)
// app.options("*", cors())

app.use(express.json())

app.use("/api/user", userRouter)

app.use(appLevelErrorHandlerMiddleware)

export default app
