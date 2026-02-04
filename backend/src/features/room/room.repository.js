import { RoomModel } from "./room.schema.js"


export const roomCreationRepo=async(roomData)=>{

try {
    const newRoom=new RoomModel(roomData)
    await newRoom.save()

return{
    success:true,
    status:201,
    message:`New room with name:${newRoom?.roomName} has been created uccessfully`,
   


}

} catch (error) {
// if (error.code === 11000) {
//       return {
//         success: false,
//         error: {
//           statusCode: 409, // Conflict
//           message: "Room name already exists"
//         }
//       };
//     }


    return{
        success:false,
        error:{
            statusCode:500,
            message:error
        }


    }
    
}


}