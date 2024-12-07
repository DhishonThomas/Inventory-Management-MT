import express from 'express'
import router from './routes/routes'
import db from './config/db'
import dotenv from 'dotenv'
import cors from 'cors'

const app=express()
dotenv.config()
db()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:4173', 'https://inventory.curecart.store'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use("/api",router)

app.listen(4000,()=>{
    console.log("server running on 4000")
})