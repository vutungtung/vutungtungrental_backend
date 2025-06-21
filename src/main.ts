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


