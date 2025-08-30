import { Request, Response } from "express";
import dotenv from "dotenv";
import {
  careeteLoginModal,
  checkAlreadyLoggedIn,
  checkExistingAdmin,
  checkExistingUser,
} from "../../Modal/Login-Logout/loginModal";
import {
  generateAccessToken,
  generateRefreshToken,
  Tokenload,
} from "../../loginMiddleware/jwtToken";
import {
  EXPIRE_ACCESS_TOKEN,
  EXPIRE_REFRESH_TOKEN,
} from "../../loginMiddleware/expireTime";

dotenv.config();

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check both user and admin tables
    const [user, admin] = await Promise.all([
      checkExistingUser(email, password),
      checkExistingAdmin(email, password),
    ]);
    const adminId = Number(admin?.adminId);

    if (!user && !admin) {
      res.status(401).json({
        message: "Incorrect email or password",
      });
      return;
    }

    // Check if already logged in
    const loggedIn = await checkAlreadyLoggedIn(email);
    if (loggedIn) {
      res.status(401).json({
        message: "Cannot login twice",
      });
      return;
    }

    // Determine if it's an admin or user login
    const isAdmin = !!admin;
    const userId = Number(user?.userId ?? admin?.adminId);
    const role = isAdmin ? "admin" : "user";

    // Create token payload
    const userPayload: Tokenload = {
      userId: userId ?? "",
      role: role,
    };

    // Generate tokens
    const refreshToken = generateRefreshToken(userPayload);
    const access_token = generateAccessToken(userPayload);

    // Set cookies
    console.log("this is the refresh token", refreshToken);
    res.cookie("refresh_token", refreshToken, {
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRE_REFRESH_TOKEN * 1000),
    });
    console.log("This is the access token", access_token);
    res.cookie("access_token", access_token, {
      path: "/",
      secure: true,
      sameSite: "lax",
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRE_ACCESS_TOKEN * 1000),
    });

    // Store login record
    const createLogin = await careeteLoginModal({
      userId: user?.userId ?? null,
      adminId: admin?.adminId ?? null,
      email,
      password,
      refreshToken,
      role,
    });

    res.status(200).json({
      message: "Logged In",
      role: role,
      data: createLogin,
    });
    return createLogin;
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Unable to login",
    });
    return;
  }
};

export { loginUser };
