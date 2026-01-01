import mongoose from "mongoose"



 const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"Name is Required"],
    minLength:[3,"The name should be at least 3 characters long"]
},
email:{
    type:String,
    required:[true,"Email Is required"],
    match:[/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
},
password:{
    type:String,
    required:[true,"Password is required"]
}



})
export const UserModel=mongoose.model("User",userSchema)
