import express from 'express'
import { userController } from '../controllers/userController'

const user_controller=new userController()

const router = express.Router()


router.get("/login",(req,res)=>user_controller.user_login(req,res))



export default router