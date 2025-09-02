import { resetPasswordService } from "../../Modal/Login-Logout/resetPasswordModal";
import { Request, Response } from "express";

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
      const { newPassword, confirmPassord } = req.body;
      if (newPassword !== confirmPassord) {
        res
          .status(400)
          .json({ message: "New Passowrd and Confirm password didn't match" });
      }
      const result = await resetPasswordService.resetPassword(
        newPassword,
        req.session
      );
      res.json(result);
      return;
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },
};
