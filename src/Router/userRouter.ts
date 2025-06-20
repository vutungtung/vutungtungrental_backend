import {Router} from "express";
import { createUserController, deleteUserController, getAllUserController, updateUserController } from "../Controller/userController";

const userRouter=Router()

userRouter.post("/",createUserController)
userRouter.get("/",getAllUserController)
userRouter.put("/:id",updateUserController)
userRouter.post("/delete",deleteUserController)

export {userRouter}