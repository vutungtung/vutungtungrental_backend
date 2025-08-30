import { error } from "console";
import {
  createUser,
  deleteUserModal,
  getALlUserMdoal,
  getUserByEmail,
  pendingUserModal,
  updateUserModal,
} from "../Modal/userModal";
import { Request, Response } from "express";

// Extend express-session types to include 'email' and 'pendingUserData' in SessionData
declare module "express-session" {
  interface SessionData {
    email?: string;
    pendingUserData?: any;
  }
}
import {
  createOwner,
  getSpecificAdmin,
  updateAdmin,
} from "../Modal/adminModal";
import { createAdmin } from "./adminController";
import dotenv from "dotenv";
import transporter from "../Verify/nodeMailer";
import { prisma } from "../db";
import { otpService } from "../Verify/otpService";

dotenv.config();

const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const pendingUserData = await pendingUserModal({
      username,
      email,
      password,
      role,
    });

    if (!pendingUserData) {
      res
        .status(500)
        .json({ success: false, message: "Pending user creation failed" });
      return;
    }

    // ✅ Save pending user in session
    req.session.pendingUser = pendingUserData;
    req.session.email = email;

    const otpResult = await otpService.sendOtp(email, req.session);
    if (!otpResult.success) {
      res.status(500).json({ success: false, message: otpResult.message });
      return;
    }

    res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to create your account.",
    });
  } catch (error) {
    console.error("Error in createUserController:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all user
const getAllUserController = async (req: Request, res: Response) => {
  try {
    const getData = await getALlUserMdoal();
    if (!getData) {
      res.status(400).json({ message: "cannot get the data" });
    }
    res.status(200).json(getData);
  } catch (err) {
    res.status(500).json({
      message: "No data found",
    });
  }

  return;
};

// update User from email

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password, ownername } = req.body;
    const findUser = await getUserByEmail(email);
    const findAdmin = await getSpecificAdmin(email);
    if (findUser) {
      const update = await updateUserModal({ username, email, password });
      console.log(update);
      res.status(200).json({
        message: "User Updated:",
        data: update,
        isSuccess: true,
      });
    } else if (findAdmin) {
      const update = await updateAdmin(ownername, email, password);
      res.status(200).json({
        message: "Admin Updated",
        data: update,
        isSuccess: true,
      });
      return;
    }
    res.status(400).json({
      message: "Unable to update ",
      isSuccess: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "unable to update",
    });
  }
};

// delete user from email and password

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // finding the email in user table
    const findUser = await getUserByEmail(email);
    if (!findUser) {
      res.status(404).json({
        message: " Register first to delete User",
      });
    }
    // check user and passeword and delete
    const deleteUser = await deleteUserModal(email, password);
    if (!deleteUser) {
      res.status(404).json({
        message: "Unable to delete the user",
      });
    }
    res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "unable to delete the user",
    });
  }
};

export {
  createUserController,
  getAllUserController,
  updateUserController,
  deleteUserController,
};
