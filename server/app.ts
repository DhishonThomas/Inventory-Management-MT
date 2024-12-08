import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import router from './routes/routes'
import db from './config/db'
import cors from 'cors'

import fs from 'fs';

// Check if the .env file is being loaded correctly
try {
    const data = fs.readFileSync('/usr/src/app/.env', 'utf8');
    console.log("Contents of .env file:", data);
} catch (err) {
    console.log("Error reading .env file:", err);
}



const app=express()
console.log('MongoDB URI:', process.env.MONGODB_URI);
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