import { Request,Response } from "express";
import userSchema from "../models/userModel";

export class userController{
    constructor(){}

    async user_login(req:Request,res:Response){
        console.log("controller reached")
        res.send("Welcome to login.")
        }

        async user_signUp(req:Request,res:Response){
            const {name,email,password}=req.body

            const db= userSchema()
            res.send("Welcome to signup")
        }
}
