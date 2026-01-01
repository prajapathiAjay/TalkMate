
import { UserModel } from "./user.schema.js"

export const userRegisterationRepo = async (userData) => {


    try {
        const newUser = new UserModel(userData)
        await newUser.save()
        return {
            success: true,
            status: 201,
            message: "User Registered Successfully",
            data: newUser
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