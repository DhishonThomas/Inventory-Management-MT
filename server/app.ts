import express from 'express'
import router from './routes/routes'
import db from './config/db'
import dotenv from 'dotenv'

const app=express()
dotenv.config()
db()
app.use(express.json())
app.use("/api",router)

app.listen(4000,()=>{
    console.log("server running on 4000")
})