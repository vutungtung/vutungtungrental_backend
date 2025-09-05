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
import { comparePassword } from "../../Utils/passwordHashing";

dotenv.config();

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check both user and admin tables
    const [user, admin] = await Promise.all([
      checkExistingUser(email),
      checkExistingAdmin(email),
    ]);

    if (!user && !admin) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Determine account and password
    const account = user ?? admin;
    if (!account.password) {
      return res.status(500).json({ message: "No password found for account" });
    }

    const isValid = await comparePassword(password, account.password);
    if (!isValid) {
      return res.status(400).json({ message: "Password did not match" });
    }

    // Check if already logged in
    const loggedIn = await checkAlreadyLoggedIn(email);
    if (loggedIn) {
      return res.status(401).json({ message: "Cannot login twice" });
    }

    // Determine if it's an admin or user login
    const isAdmin = !!admin;
    const userId = Number(user?.userId ?? admin?.adminId);
    const role = isAdmin ? "admin" : "user";

    // Create token payload
    const userPayload: Tokenload = {
      userId,
      role,
    };

    // Generate tokens
    const refreshToken = generateRefreshToken(userPayload);
    const accessToken = generateAccessToken(userPayload);

    // Set cookies
    res.cookie("refresh_token", refreshToken, {
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRE_REFRESH_TOKEN * 1000),
    });
    res.cookie("access_token", accessToken, {
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
      password: account.password,
      refreshToken,
      role,
    });

    return res.status(200).json({
      message: "Logged In",
      role,
      data: createLogin,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Unable to login" });
  }
};

export { loginUser };
