import { Request,Response } from "express";

export class userController{
    constructor(){}

    async user_login(req:Request,res:Response){
        console.log("controller reached")
        res.send("Welcome to login.")
        }
}
