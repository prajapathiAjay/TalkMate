import bcrypt from "bcrypt"




 export const userRegisteration=async (req,res,next)=>{

const {password}=req.body

try {
    const hashedPassword=await bcrypt.hash(password,10)
    //  const response=await 
    return  res.status(201).json({
      success: true,
      msg: "user registration successful",
      res: "response from user registeration"
    });

} catch (error) {
    
}




}