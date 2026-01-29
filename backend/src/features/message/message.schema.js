import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,


    },
    senderName: {
        type: String,
        required: true,

    },
    message: {
        type: String,
        required: true
    },


}, { timestamps: true })



export const MessageModel=mongoose.model("Message",messageSchema)






