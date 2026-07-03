import {FriendModel} from "./friend.schema.js"


export const getFriendsRepo=async(userId)=>{

try{
const response=await FriendModel.find({userId}).populate("friendId",  "name email isOnline lastSeen")
    return {
        success:true,
        status:200,
        data:response
    }

}catch(error){
    return {
        success:false,
        error:{
            statusCode:500,
            message:error
        }
    }



}
}






export const addFriendRepo=async(userId,friendId)=>{
    
    try{
        const existingFriend=await FriendModel.findOne({userId,friendId})
        if(existingFriend){
            return {
                success:false,
                error:{
                    statusCode:400,
                    message:"Friend already exists"
                }
            }
        }

console.log("userId in repo",userId,"friendId",friendId)
        const response=await FriendModel.create({userId,friendId})
        console.log("Friend added successfully",response)
        return {
            success:true,
            status:200,
            data:response
        }

    }catch(error){
        return {
            success:false,
            error:{
                statusCode:500,
                message:error
            }
        }
    }
}