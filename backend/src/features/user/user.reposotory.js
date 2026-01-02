
import { UserModel } from "./user.schema.js"
import bcrypt from "bcrypt"
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


export const userSignInRepo = async (data) => {
    const { email, password } = data

    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return {
                success: false,
                error: {
                    statusCode: 404,
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
                    data: user
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