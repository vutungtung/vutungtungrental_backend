import {Router} from "express";
import { createUserController, deleteUserController, getAllUserController, updateUserController } from "../Controller/userController";
import { getAllAdmin } from "../Modal/adminModal";
import { findAdminByEmail, getAdminController } from "../Controller/adminController";

const userRouter=Router()

userRouter.post("/",createUserController)
userRouter.get("/",getAllUserController)
userRouter.post("/updateuser",updateUserController)
userRouter.post("/delete",deleteUserController)
userRouter.get('/admin',getAdminController)
userRouter.get('/admin/find',findAdminByEmail)

export {userRouter}