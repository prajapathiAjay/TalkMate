import { RoomModel } from "./room.schema.js"

export const roomCreationRepo = async (roomData) => {

    try {
        if (!roomData?.type) {
            return {
                success: false,
                error: {
                    statusCode: 400,
                    message: "Room  type is required"
                }
            }
        }
        let existingRoom

        if (roomData?.type === "private") {
            existingRoom = await RoomModel.findOne({
                type: "private", participants: {
                    $all: roomData.participants,
                    // $size: users.length
                }
            })

        }


        if (existingRoom) {
    return {
        success: false,
        error: {
            statusCode: 400,
            message: "Room already exists for chat"
        }
    };
}



        const newRoom = new RoomModel(roomData)
        await newRoom.save()

        return {
            success: true,
            status: 201,
            message: `New room with name:${newRoom?.roomName} has been created uccessfully`,
            data: newRoom


        }

    } catch (error) {
        if (error.code === 11000) {
            return {
                success: false,
                error: {
                    statusCode: 409, // Conflict
                    message: "Room name already exists"
                }
            };
        }

        return {
            success: false,
            error: {
                statusCode: 500,
                message: error
            }


        }

    }


}



export const getRoomDataRepo = async (data) => {


    try {
        if (data?.type === "public") {

            const roomData = await RoomModel.findOne({ type: data?.type })

            return {
                success: true,
                status: 200,
                data: roomData

            }
        } else if (data?.type === "private") {



            console.log("private", data)
            const roomData = await RoomModel.find({ type: "private", participants: { $in: data?.participantIds } })

            return {
                success: true,
                status: 200,
                data: roomData

            }

        }





    } catch (error) {
          return {
            success: false,
            error: {
                statusCode: 500,
                message: error
            }


        }

    }






}