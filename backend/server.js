import dotenv from "dotenv"
dotenv.config()
import http from "http"
import app from "./app.js"
import {socketLogic} from "./src/socket/socketLogic.js"
import { connectToDb } from "./src/config/db.js"
// 

const server=http.createServer(app)

socketLogic(server)
const PORT=process.env.PORT

server.listen(PORT,()=>{
    console.log(`server is started on port ${PORT}`)
    connectToDb() 
})