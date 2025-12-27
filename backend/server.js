import http from "http"
import app from "./app.js"
import {socketLogic} from "./socket/socketLogic.js"

const server=http.createServer(app)




server.listen(3000,()=>{
    console.log("server is started")
})