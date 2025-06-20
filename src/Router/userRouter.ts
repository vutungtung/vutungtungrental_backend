import {Router} from "express";
import { createUserController, getAllUserController } from "../Controller/userController";

const userRouter=Router()

userRouter.post("/",createUserController)
userRouter.get("/",getAllUserController)

export {userRouter}