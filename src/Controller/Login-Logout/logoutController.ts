import { Request, Response } from "express";
import { checkAlreadyLoggedIn } from "../../Modal/Login-Logout/loginModal";
import {
  checkRefreshToken,
  logoutUserModal,
} from "../../Modal/Login-Logout/logoutModal";

async function logoutUserController(req: Request, res: Response) {
  try {
    const getrefreshToken = req.cookies["refresh_token"];
    console.log("logout refresh token:", getrefreshToken);
    if (!getrefreshToken) {
      res.status(404).json({
        message: "Login first",
        isSuccess: false,
      });
    }
    const deldata = await checkRefreshToken(getrefreshToken);
    console.log("data to be deleted", deldata);

    if (deldata !== null) {
      res.clearCookie("refresh_token");
      res.clearCookie("access_token");
      await logoutUserModal(deldata.email, deldata.password);
      res.status(200).json({
        message: "Logout Successfuly",
      });
    }
    res.status(404).json({
      message: "Cannot Logout",
    });
  } catch (err) {
    console.log("Logout error:", err);
    res.status(500).json({
      message: "Server Error: Unable to logout",
    });
  }
}

export { logoutUserController };
