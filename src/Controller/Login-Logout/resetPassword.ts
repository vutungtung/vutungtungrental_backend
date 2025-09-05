import { resetPasswordService } from "../../Modal/Login-Logout/resetPasswordModal";
import { Request, Response } from "express";
import { hashPassword } from "../../Utils/passwordHashing";

export const resetPasswordController = {
  async sendOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await resetPasswordService.sendOtp(email, req.session);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async resendOtp(req: Request, res: Response) {
    try {
      const result = await resetPasswordService.resendOtp(req.session);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async verifyOtp(req: Request, res: Response) {
    try {
      const { otp } = req.body;
      const result = await resetPasswordService.verifyOtp(otp, req.session);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { newPassword, confirmPassword } = req.body;

      // Check if passwords match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          message: "New Password and Confirm Password didn't match",
        });
      }

      if (!req.session) {
        return res.status(400).json({ message: "Session not found" });
      }
      const hashedPassword = await hashPassword(newPassword);
      console.log("this is hashed passowrd:", hashedPassword);
      // Call the reset password service
      const result = await resetPasswordService.resetPassword(
        hashedPassword,
        req.session
      );

      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
