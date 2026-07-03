
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { roomCreationRepo,getRoomDataRepo } from "./room.repository.js";



export const roomCreation = async (req,res,next) => {
    const {roomName,type} = req.body;
    console.log("roombody",req.body)
    

    try {

        const resp = await roomCreationRepo(req.body)


        if (resp.success) {
            return res.status(201).json({
                successs: true,
                message: resp?.message,
                data: resp.data
            })

        }



        return next(
            new customErrorHandler(
                resp.error?.statusCode,
                resp.error?.message
            )


        )

    } catch (error) {
        new customErrorHandler(
            error?.statusCode || 500,
            error?.message || "Error while Creating the room"
        )
    }








}

export const getRoomData=async (req,res,next)=>{
   const {type,roomId}=req.query

    try {
 const resp=await getRoomDataRepo({type,roomId})

 if(resp.success){
    return res.status(200).json({
        success: true,
        message: resp?.message,
        data: resp.data
    })
 }

 return next(
    new customErrorHandler(
        resp.error?.statusCode,
        resp.error?.message || "Error while fetching the room data"
    )
 )

           
    } catch (error) {
        
        new customErrorHandler(
            error?.statusCode || 500,
            error?.message || "Error while fetching the room data"
        )
    }

}

























