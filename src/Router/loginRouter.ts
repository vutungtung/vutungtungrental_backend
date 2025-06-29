import { Router } from "express";
import { authenMiddleware } from "../Middleware/authMiddleware";
import { loginUser } from "../Controller/Login-Logout/loginController";
import { logoutUserController } from "../Controller/Login-Logout/logoutController";
const loginRouter=Router()
const logoutRouter=Router()
// user login
loginRouter.post('/',authenMiddleware,loginUser)
// logout

logoutRouter.post('/',logoutUserController)

export {loginRouter,logoutRouter}