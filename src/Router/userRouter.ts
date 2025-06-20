import {Router} from "express";
import { createUserController, getAllUserController, updateUserController } from "../Controller/userController";

const userRouter=Router()

userRouter.post("/",createUserController)
userRouter.get("/",getAllUserController)
userRouter.put("/:id",updateUserController)

export {userRouter}