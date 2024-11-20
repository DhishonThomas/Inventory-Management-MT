import express from 'express'
import { userController } from '../controllers/userController'

const user_controller=new userController()

const router = express.Router()


router.post("/login",(req,res)=>user_controller.user_login(req,res))
router.post("/signUp",(req,res)=>user_controller.user_signUp(req,res))



export default router