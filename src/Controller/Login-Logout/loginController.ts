import { Request, Response } from "express";
import { getUserByEmail } from "../../Modal/userModal";
import dotenv from "dotenv";
import {
  careeteLoginModal,
  checkAlreadyLoggedIn,
  checkExistingUser,
} from "../../Modal/Login-Logout/loginModal";
dotenv.config();
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await checkExistingUser(email, password);
    if (!user) {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
    const loggedIn = await checkAlreadyLoggedIn(email);
    if (!loggedIn) {
      const userId = user[0].userId;

      //    creating refresh token
      const refreshToken = crypto.randomUUID();

      const EXPIRE_REFRESH_TOKEN = 7 * 24 * 60 * 60;
      res.cookie("refresh_token", refreshToken, {
        path: "/",
        sameSite: "lax",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + EXPIRE_REFRESH_TOKEN * 1000),
      });
      //    storing the data in login table

      const storeLogin = await careeteLoginModal({
        userId,
        email,
        password,
        refreshToken,
      });
      //    creating Access token
      const access_token = crypto.randomUUID();
      const EXPIRE_ACCESS_TOKEN = 150;
      res.cookie("access_token", access_token, {
        path: "/",
        secure: true,
        sameSite: "lax",
        httpOnly: true,
        expires: new Date(Date.now() + EXPIRE_ACCESS_TOKEN * 1000),
      });
      res.status(200).json({
        message: "Logged In",
      });
    }
    res.status(401).json({
      message: "Cannot login twice",
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to login",
    });
  }
};
