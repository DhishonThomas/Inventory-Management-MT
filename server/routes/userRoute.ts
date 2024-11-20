import express from 'express'
import { userController } from '../controllers/userController'

const user_controller=new userController()

const router = express.Router()


router.post("/login",(req,res)=>user_controller.user_login(req,res))
router.post("/signUp",(req,res)=>user_controller.user_signUp(req,res))
router.get("/verifyLogin",(req,res)=>user_controller.verifyLogin(req,res))

router.get("/profile",(req,res)=>user_controller.profile(req,res))


export default router