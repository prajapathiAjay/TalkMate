import { MessageModel } from "./message.schema.js"
export const createMessageRepository = async (messageData) => {

    try {
        const newMessage = new MessageModel(messageData)
        await newMessage.save()

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
                message:error
            }

        }
    }

}

export const getMessageRepo = async (getmsgPayload) => {

    try {
        const { type } = getmsgPayload
        const messages = await MessageModel.find({ type })

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

