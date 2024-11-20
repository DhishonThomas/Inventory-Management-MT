import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcryptjs'

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

userSchema.methods.comparePassword=async function (password:string):Promise<boolean> {
    return await bcrypt.compare(password,this.password)
}

export default mongoose.model<IUser>("User", userSchema);

