


import { customErrorHandler } from "../../middlewares/errorHandler";
import { roomCreationRepo } from "./room.repository.js";



export const roomCreation = async (req,res,next) => {
    const roomData = req.body;

    try {

        const resp = await roomCreationRepo(roomData)


        if (resp.success) {
            return resp.status(201).json({
                successs: true,
                message: resp.message,
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

























