import express from 'express'
import { Request,Response } from 'express'
import router from './routes/userRoute'

const app=express()


// app.use(express.json())

app.use("/api",router)

app.listen(4000,()=>{
    console.log("server running on 4000")
})