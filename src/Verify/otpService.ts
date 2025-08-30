import transporter from "./nodeMailer";

export const otpService = {
  generateOtp: () => String(Math.floor(100000 + Math.random() * 900000)),

  sendOtpEmail: async (email: string, otp: string) => {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Verify your Account",
        html: `
          <h3>Verify your account</h3>
          <p>Your OTP is: <b>${otp}</b></p>
          <p>Expires in 10 minutes</p>
        `,
      };
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (err) {
      console.error("Error sending OTP email:", err);
      return { success: false, message: "Failed to send OTP email" };
    }
  },

  sendOtp: async (email: string, session: any) => {
    if (!session.pendingUser) {
      return { success: false, message: "No pending user data" };
    }

    const otp = otpService.generateOtp();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins

    session.pendingUser.otp = otp;
    session.pendingUser.otpExpiry = otpExpiry;

    await new Promise<void>((resolve, reject) => {
      session.save((err: any) => (err ? reject(err) : resolve()));
    });

    return otpService.sendOtpEmail(email, otp);
  },

  resendOtp: async (session: any) => {
    if (!session.pendingUser) {
      return { success: false, message: "No pending user data" };
    }
    return otpService.sendOtp(session.pendingUser.email, session);
  },

  verifyOtp: async (otp: string, session: any) => {
    if (!session.pendingUser) {
      return { success: false, message: "No pending user data" };
    }

    const pendingUser = session.pendingUser;

    if (!pendingUser.otp || !pendingUser.otpExpiry) {
      return { success: false, message: "OTP not generated or expired" };
    }

    if (pendingUser.otp !== otp)
      return { success: false, message: "Invalid OTP" };
    if (Date.now() > pendingUser.otpExpiry)
      return { success: false, message: "OTP expired" };

    // ✅ Clear OTP
    pendingUser.otp = undefined;
    pendingUser.otpExpiry = undefined;

    return { success: true, message: "OTP verified" };
  },
};
