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

const userRouter = Router();

userRouter.post("/register", createUserController);
userRouter.post("/verify-otp", verifyOtpController);
userRouter.post("/ressend-otp", resendOtpController); //resed the otp

userRouter.get("/", getAllUserController);
userRouter.post("/updateuser", updateUserController);
userRouter.post("/delete", deleteUserController);
userRouter.get("/admin", getAdminController);
userRouter.get("/admin/find", findAdminByEmail);

export { userRouter };
