import express from 'express'
import dotenv from 'dotenv' 
import { userRouter } from './Router/userRouter';
import { loginRouter, logoutRouter } from './Router/loginRouter';
import cookieParser from 'cookie-parser';
import { vehicleRouter } from "./Router/vehicleRouter";
import { categoryRouter } from "./Router/categoryRouter";
const app=express();
const PORT=4000;
dotenv.config()

app.use(cookieParser())
app.use(express.json())

app.use("/user",userRouter)
app.use("/userlogin",loginRouter)
app.use("/userlogout",logoutRouter)
app.use("/api/vehicles", vehicleRouter);
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
