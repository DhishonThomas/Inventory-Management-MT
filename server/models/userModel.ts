import mongoose, { Schema } from "mongoose"

export interface IUser{
    name:string;
    email:string;
    password:string;
}


const userSchema:Schema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}
})

export default mongoose.model<IUser>("User", userSchema);

