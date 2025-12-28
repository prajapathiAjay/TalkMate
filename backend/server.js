import http from "http"
import app from "./app.js"
import {socketLogic} from "./src/socket/socketLogic.js"

const server=http.createServer(app)

socketLogic(server)


server.listen(3000,()=>{
    console.log("server is started")
})