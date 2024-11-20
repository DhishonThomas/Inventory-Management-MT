import { Request, Response } from "express";
import User from "../models/userModel";
import { hashedPassword } from "../utils/passwordManager";
import { generateToken } from "../utils/jwtManager";

export class userController {
  constructor() {}

  async user_login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(200).json({ status: false, message: "Invalid credentials" });
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.status(200).json({ status: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await (User as any).comparePassword(password);

    if (!isPasswordValid) {
      res.status(200).json({ status: false, message: "Invalid credentials" });
      return;
    }
    const payload = { userId: findUser?._id };
    const token = generateToken(payload);

    res
      .status(201)
      .json({
        token: token,
        status: true,
        message: "Success fully token generated.",
      });
  }

async profile(req:Request,res:Response){

}



  async user_signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res
        .status(200)
        .json({ status: false, message: "Email already existing" });
    }
    if (name.length >= 3) {
      res.status(200).json({
        status: false,
        message: "Name must be more than three letters",
      });
    }
    const hashed_password = await hashedPassword(password);

    const db = await User.create({
      name: name,
      email: email,
      password: hashed_password,
    });

    console.log(db);
    if (!db) {
      res
        .status(200)
        .json({ status: false, message: "Server not created user.error" });
      return;
    }

    res
      .status(200)
      .json({ status: false, message: "Inventory user created successfully." });
  }
}
