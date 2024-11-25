import { Request, Response } from "express";
import User from "../models/userModel";
import { hashedPassword } from "../utils/passwordManager";
import { generateToken } from "../utils/jwtManager";

interface AuthUserRequest extends Request {
  user?: any;
}
export class userController {
  constructor() {}

  async user_login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({ status: false, message: "Invalid credentials" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ status: false, message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await user?.comparePassword(password);

    if (!isPasswordValid) {
      res.status(404).json({ status: false, message: "Invalid credentials" });
      return;
    }
    const payload = { userId: user?._id };
    const token = generateToken(payload);
console.log("token gendered",token)
    res.status(201).json({
      token: token,
      status: true,
      message: "Success fully token generated.",
    });
  }

  async verifyLogin(req: AuthUserRequest, res: Response) {
    const user = await User.findById({ _id: req.user?.userId });
    if (user) {
      res
        .status(201)
        .json({ status: true, message: "Successfully verified", user: user });
    }
  }
  async user_signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(404)
        .json({ status: false, message: "Please fill all the fields" });
      return;
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res
        .status(404)
        .json({ status: false, message: "Email already existing" });
    }

    if (name.length <= 3) {
      res.status(404).json({
        status: false,
        message: "Name must be more than three letters",
      });
return
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
        .status(404)
        .json({ status: false, message: "Server not created user.error" });
      return;
    }

    res
      .status(201)
      .json({ status: true, message: "Inventory user created successfully." });
  }
}
