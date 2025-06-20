import express from 'express'
import dotenv from 'dotenv' 
import { userRouter } from './Router/userRouter';

const app=express();
const PORT=4000;
dotenv.config()


app.use(express.json())

app.use("/user",userRouter)


app.listen(PORT,()=>{
    console.log("You are on port number:",PORT)
})


