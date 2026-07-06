import { MessageModel } from "./message.schema.js"
export const createMessageRepository = async (messageData) => {
    console.log("message data in repository", messageData);
    try {
        const newMessage = new MessageModel(messageData)
        await newMessage.save()
        // console.log("new message in repository", newMessage);
        return {
            success: true,
            status: 201,
            message: `New message has been created successfully`,
            data: newMessage
        }
    } catch (error) {
        return {
            success: false, error: {
                statusCode: 500,
                message: error
            }

        }
    }

}

export const getMessageRepo = async (getmsgPayload) => {

    try {
        const { roomId } = getmsgPayload
        const messages = await MessageModel.find({ roomId:roomId })

        return ({
            success: true,
            status: 200,
            message: "messageFetched Successfully",
            data: messages
        })
    } catch (error) {
        return ({
            success: false,
            status: 500,
            message: error.message
        })
    }



}

