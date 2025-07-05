import { Request, Response } from "express";
import { checkAlreadyLoggedIn } from "../../Modal/Login-Logout/loginModal";
import {
  checkRefreshToken,
  logoutUserModal,
} from "../../Modal/Login-Logout/logoutModal";

async function logoutUserController(req: Request, res: Response) {
  try {
    const getrefreshToken = req.cookies["refresh_token"];

    if (!getrefreshToken) {
      res.status(404).json({
        message: "Login first",
        isSuccess: false,
      });
    }
    const deldata = await checkRefreshToken(getrefreshToken);


    if (deldata !== null) {
      res.clearCookie("refresh_token");
      res.clearCookie("access_token");
      res.status(200).json({
        message: "Logout Successfuly",
      });
    }
    res.status(404).json({
      message: "Cannot Logout",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error: Unable to logout",
    });
  }
}

export { logoutUserController };
