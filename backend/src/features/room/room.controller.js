


import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { roomCreationRepo } from "./room.repository.js";



export const roomCreation = async (req,res,next) => {
    const {roomName,type,} = req.body;
    const roomData={
        roomName:roomName,
        type:type,
        createdBy:req.user.id,
        admins:req.user.id,
        admins: [req.user.id],
        participants: [req.user.id],

    }

    try {

        const resp = await roomCreationRepo(roomData)


        if (resp.success) {
            return res.status(201).json({
                successs: true,
                message: resp?.message,
                // data: resp.data
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

























