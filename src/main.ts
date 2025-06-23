import express from 'express'
import dotenv from 'dotenv' 
import { userRouter } from './Router/userRouter';
import { loginRouter, logoutRouter } from './Router/loginRouter';
import cookieParser from 'cookie-parser';
const app=express();
const PORT=4000;
dotenv.config()

app.use(cookieParser())
app.use(express.json())

app.use("/user",userRouter)
app.use("/userlogin",loginRouter)
app.use("/userlogout",logoutRouter)


app.listen(PORT,()=>{
    console.log("You are on port number:",PORT)
})


import express from "express";
import dotenv from "dotenv";
import { vehicleRouter } from "./Router/vehicleRouter";
import { categoryRouter } from "./Router/categoryRouter";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

// Must have JSON body parser middleware
app.use(express.json());

app.use("/api/vehicles", vehicleRouter);
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
