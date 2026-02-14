import { createMessageRepository } from "./message.repository.js"
export const createMessage = async (messageData) => {
    try {
        const messageSaved = await createMessageRepository(messageData)
        if (messageSaved.success) {
          return messageSaved
        }else{
            throw new Error(messageSaved.error.message || "Failed to create message")
        }
    } catch (error) {
        throw error
    }

}