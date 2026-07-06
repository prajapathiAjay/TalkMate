
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { roomCreationRepo, getRoomDataRepo, roomDatawithseenRepo } from "./room.repository.js";



export const roomCreation = async (req, res, next) => {
    const { roomName, type } = req.body;
    console.log("roombody", req.body)


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
        return next(
            new customErrorHandler(
                error?.statusCode || 500,
                error?.message || "Error while Creating the room"
            )
        );
    }








}

export const getRoomData = async (req, res, next) => {
    const { type, participants } = req.query
    console.log("controller", req.query)
    const participantIds = Array.isArray(participants)
        ? participants
        : [participants];

    try {
        const resp = await getRoomDataRepo({ type, participantIds }, req.user.id)

        if (resp.success) {
            return res.status(resp?.status).json({
                success: resp.success,
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







export const roomDatawithseen = async (req, res, next) => {
    const data = req.params

    try {
        const response = await roomDatawithseenRepo(data, req?.user?.id)
        if (response?.success) {
            return res.status(response?.status).json({

                success: response?.success,
                status: response?.status,
                message:response?.message,
                data: response?.data


            })

        }
            return next(
            new customErrorHandler(
                resp.error?.statusCode,
                resp.error?.message || "Error while fetching the privateroom data"
            )
        )


    } catch (error) {
        new customErrorHandler(
            error?.statusCode || 500,
            error?.message || "Error while fetching the room data"
        )


    }
}
















