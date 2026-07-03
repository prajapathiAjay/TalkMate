

import { UserModel } from "./user.schema.js"
import { RoomModel } from "../room/room.schema.js"
import { FriendModel } from "../friend/friend.schema.js"
import bcrypt from "bcrypt"


export const userRegisterationRepo = async (userData) => {

    try {
        const publicRoomData = await RoomModel.findOne({ type: "public" })
        const newUser = new UserModel(userData)
        // const publicRoomData = await RoomModel.findOne({ type: "public" })

        if (publicRoomData) {
            // publicRoomData.participants.push(newUser._id)
            // await publicRoomData.save()
        }
        await newUser.save()
        return {
            success: true,
            status: 201,
            message: "User Registered Successfully",
            data: {
                user: {
                    publicRoomId: publicRoomData?._id,
                    userId: newUser?._id,
                    name: newUser?.name,
                    // email: newUser.email,

                }
            }
        }
    } catch (error) {
        return {
            success: false,
            error: {
                statusCode: 500,
                msg: error
            }

        }

    }


}


export const userSignInRepo = async (data) => {
    const { email, password } = data

    try {
        const user = await UserModel.findOne({ email })
        const publicRoomData = await RoomModel.findOne({ type: "public" })
        console.log("public room data at signin repo", publicRoomData)
        if (!user) {
            return {
                success: false,
                error: {
                    statusCode: 401,
                    msg: "User Not Found"

                }
            }
        } else {

            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return {
                    success: false,
                    error: {
                        statusCode: 401,
                        msg: "Invalid Credentials"
                    }
                }
            } else {
                return {
                    success: true,
                    status: 200,
                    message: "Signin Successful",
                    data: {
                        user: {
                            publicRoomId: publicRoomData?._id,
                            userId: user?._id,
                            name: user?.name,
                            // email: user.email
                        }
                    }
                }
            }


        }

    } catch (error) {
        return {
            success: false,
            error: {
                statusCode: 500,
                msg: error
            }
        }
    }
}


export const getAllUsersRepo = async (id, isOnline) => {

    try {
         const filter = {};

    if (isOnline !== undefined) {
      filter.isOnline = isOnline === "true";
    }
        const getAllUser = await UserModel.find(filter).select("-password")

        const  allFriends=await FriendModel.find({ userId: { $eq: id } })


        const friendsIds = allFriends.map(friend => friend.friendId.toString());

      const gestAlluserWithFriendStatus=getAllUser.map((user)=>({
        ...user.toObject(),
        isFriend: friendsIds.includes(user._id.toString())
      }))


    

        return {
            success: true,
            status: 200,
            message: "All Users Fetched Successfully",
            data: gestAlluserWithFriendStatus
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








////////////////////////////////////////////////////////////////
// ******SOCKET REPO FUNCTIONS______________ 
////////////////////////////////////////////////////////////////       

export const handleOnlineUsersrepo = async (onlineStatus,userId) => {
    const publicRoomData = await RoomModel.findOne({ type: "public" })


    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isOnline: onlineStatus, lastSeen: new Date },
            { new: true }   // returns updated document
        );
        //  console.log("updatedUser",updatedUser)
        return {
            success: true,
            status: 200,
            data: updatedUser
        };

    } catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message
        };
    }
};