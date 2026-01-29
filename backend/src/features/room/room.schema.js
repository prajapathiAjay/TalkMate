import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        // required: true,
        // unique: true,
        index: true

    },
    isGroup: {
        type:Boolean,
        default: true
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    

    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

},{timestamps:true}

)

roomSchema.index({ participants: 1 });
roomSchema.index({ updatedAt: -1 });


export const RoomModel=mongoose.model("Room",roomSchema)