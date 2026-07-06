import { RoomModel } from "./room.schema.js"
import mongoose from "mongoose"

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






export const roomDatawithseenRepo=async(data,Id)=>{
 const myId=new mongoose.Types.ObjectId(Id)
 

try {
    
const response = await RoomModel.aggregate([
    
  {
    $match: {
      type: "private",
      participants: myId
    }
  },
  {
    $lookup: {
      from: "users",
      let: {
        participants: "$participants"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$_id", "$$participants"] }, // User is in participants
                { $ne: ["$_id", myId] }              // User is NOT me
              ]
            }
          }
        },
        {
          $project: {
            password: 0
          }
        }
      ],
      as: "friend"
    }
  },
  {
    $unwind: "$friend"
  }
]);

return{
    success:true,
    status:200,
    message:"private room dat fetched Successfully",
    data:response
}


console.log("response",response)



} catch (error) {
    console.log("error",error)
    
}




}
