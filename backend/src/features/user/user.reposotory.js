

import { UserModel } from "./user.schema.js"
import {RoomModel} from "../room/room.schema.js"
import bcrypt from "bcrypt"
export const userRegisterationRepo = async (userData) => {


    try {
        const newUser = new UserModel(userData)
        const publicRoomData=await RoomModel.findOne({type:"public"})
        
        if(publicRoomData){
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
                    publicRommId: publicRoomData?._id ,
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
         const publicRoomData=await RoomModel.findOne({type:"public"})
         console.log("public room data at signin repo",publicRoomData)
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
                            publicRoomId: publicRoomData._id,
                            userId: user._id,
                            name: user.name,
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