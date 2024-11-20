import { Request, Response } from "express";
import User from "../models/userModel";

export class userController {
  constructor() {}

  async user_login(req: Request, res: Response) {
    console.log("controller reached");
    res.send("Welcome to login.");
  }

  async user_signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        res.status(200).json({status:false,message:"Email already existing"})
    }
    
    res.send("Welcome to signup");
  }
}
