import express from 'express'
import dotenv from 'dotenv' 

const app=express();
// const PORT=4000;
dotenv.config()


app.use(express.json())




app.listen(process.env.PORT,()=>{
    console.log("You are on port number:",process.env.PORT)
})


