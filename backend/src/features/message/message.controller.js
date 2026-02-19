
import { getMessageRepo } from "./message.repository.js"
import { customErrorHandler } from "../../middlewares/errorHandler.js"

export const getMessage= async (req,res,next)=>{

const {type}=req?.query
try{

    const messages=await getMessageRepo(type)
    if(messages.success){

        return res.status(200).json({
            success:messages.success,
            status:messages.status,
            messages:messages.message,
            data:messages.data,
        })
    }
}catch(error){
return error
}
 new customErrorHandler(
        res.error?.statusCode || 400,
        res.error?.msg || "message fetching failed"
      )

}