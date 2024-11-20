import express from 'express'
import { customerController } from '../controllers/customerController'
const customer_controller=new customerController()

const router = express.Router()



export default router