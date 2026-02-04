import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        // required: true,
        // unique: true,
        index: true,
        required: true,
        unique:true

    },
    type: {
        type: String,
        enum: ["public", "private", "group"],
        required: true

    },
    createdBy: {

        type: mongoose.Schema.Types.ObjectId, ref: "User",
        default: null

    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],

    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timestamps: true }

)

roomSchema.index({ participants: 1 });
roomSchema.index({ updatedAt: -1 });


export const RoomModel = mongoose.model("Room", roomSchema)