import { RoomModel } from "./room.schema.js"

export const roomCreationRepo = async (roomData) => {

    try {
        if ( !roomData?.type) {
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
            const users = roomData.participants
            existingRoom = await RoomModel.findOne({
                type: "private", participants: {
                    $all: users,
                    $size: users.length
                }
            })



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



export const getRoomDataRepo=async (data)=>{


    try {
        if(data?.type==="public"){

const roomData=await RoomModel.findOne({type:data?.type})

            return{
                success:true,
                status:200,
                data:roomData

            }
        }

      return {
            success: true,
            status: 201,
            message: `New room with name has been created uccessfully`,



        }

   
        
    } catch (error) {
        
    }






}