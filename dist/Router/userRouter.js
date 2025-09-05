"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../Controller/userController");
const adminController_1 = require("../Controller/adminController");
const otpConotroller_1 = require("../userRegisterOtpVerify/otpConotroller");
const authMiddleware_1 = require("../loginMiddleware/authMiddleware");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/register", userController_1.createUserController);
userRouter.post("/verify-otp", otpConotroller_1.verifyOtpController);
userRouter.post("/ressend-otp", otpConotroller_1.resendOtpController); //resend the otp
userRouter.get("/", authMiddleware_1.authenMiddleware, userController_1.getAllUserController);
userRouter.put("/updateuser", authMiddleware_1.authenMiddleware, userController_1.updateUserController);
userRouter.post("/delete", userController_1.deleteUserController);
userRouter.get("/admin", adminController_1.getAdminController);
userRouter.get("/admin/find", adminController_1.findAdminByEmail);
