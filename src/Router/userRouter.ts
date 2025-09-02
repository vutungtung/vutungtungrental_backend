import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  updateUserController,
} from "../Controller/userController";
import { getAllAdmin } from "../Modal/adminModal";
import {
  findAdminByEmail,
  getAdminController,
} from "../Controller/adminController";
import {
  resendOtpController,
  verifyOtpController,
} from "../userRegisterOtpVerify/otpConotroller";
import { authenMiddleware } from "../loginMiddleware/authMiddleware";

const userRouter = Router();

userRouter.post("/register", createUserController);
userRouter.post("/verify-otp", verifyOtpController);
userRouter.post("/ressend-otp", resendOtpController); //resend the otp

userRouter.get("/", authenMiddleware, getAllUserController);
userRouter.put("/updateuser", authenMiddleware, updateUserController);
userRouter.post("/delete", deleteUserController);
userRouter.get("/admin", getAdminController);
userRouter.get("/admin/find", findAdminByEmail);

export { userRouter };
