
import { getFriendsRepo, addFriendRepo } from "./friend.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";



export const getFriends = async (req, res, next) => {

  

    try {

        const response = await getFriendsRepo(req?.user?.id)

        if (response?.success) {
            res.status(200).json({
                success: true,
                data: response?.data,
                message: "Friends fetched successfully"
            })
        }



    } catch (error) {

        new customErrorHandler(
            res.error?.statusCode || 400,
            res.error?.msg || "message fetching failed"
        )


    }







}

export const addFriend = async (req, res, next) => {
    try {
        const { userId, friendId } = req?.body



        console.log("userId", userId, "friendId", friendId)
        const response = await addFriendRepo(userId, friendId)
        if (response?.success) {
            res.status(200).json({
                success: true,
                data: response?.data,
                message: "Friend added successfully"
            })
        }
        return next(
            new customErrorHandler(
                res.error?.statusCode || 400,
                res.error?.msg || "already friends"
            )
        )
      
    } catch (error) {
        new customErrorHandler(
            res.error?.statusCode || 400,
            res.error?.msg || "adding friend failed"
        )
    }
}