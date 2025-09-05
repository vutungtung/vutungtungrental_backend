"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpService = void 0;
const nodeMailer_1 = __importDefault(require("./nodeMailer"));
exports.otpService = {
    generateOtp: () => String(Math.floor(100000 + Math.random() * 900000)),
    sendOtpEmail: (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Verify your Account",
                html: `
          <title>OTP Email Template</title>
    <style>
        /* Reset CSS for email compatibility */
        body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        /* Main styles */
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333333;
        }
        .email-container {
            width: 100%;
            background-color: #f5f5f5;
        }
        .email-content {
            background-color: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        .logo {
            text-align: center;
            padding: 20px 0;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            letter-spacing: 8px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f8f9fa;
            border-radius: 6px;
            color: #1a1a1a;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #666666;
            padding: 20px;
        }
       
        .support {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
    </style>
</head>
<body>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="email-container">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container">
                    <!-- Logo Section -->
                    <tr>
                        <td class="logo">
                            <h1>VutunTung</h1>
                        </td>
                    </tr>
                    
                    <!-- Email Content -->
                    <tr>
                        <td class="email-content">
                            <h2>Your One-Time Password (OTP)</h2>
                            <p>Hello ${email}</p>
                            <p>You requested a one-time password to access your account. Use the following code to complete your verification:</p>
                            
                            <!-- OTP Code Display -->
                            <div class="otp-code">${otp}</div>
                            
                            <p>This code will expire in <strong>10 minutes</strong>. For security reasons, please do not share this code with anyone.</p>
                            
                            <p>If you didn't request this code, please ignore this email or contact support if you have concerns.</p>
                            
                            
                        </td>
                    </tr>
                    
                    <!-- Support Section -->
                    <tr>
                        <td class="support">
                            <p>Need help? Contact our support team at <a href="mailto:support@vutungtung.com">support@vutungtun.com</a></p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p>© 2023 VutungTung All rights reserved.</p>
                            <p>123 Business Street, City, State 12345</p>
                            <p>
                                <a href="#">Unsubscribe</a> | 
                                <a href="#">Privacy Policy</a> | 
                                <a href="#">Terms of Service</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
        `,
            };
            yield nodeMailer_1.default.sendMail(mailOptions);
            return { success: true };
        }
        catch (err) {
            console.error("Error sending OTP email:", err);
            return { success: false, message: "Failed to send OTP email" };
        }
    }),
    sendOtp: (email, session) => __awaiter(void 0, void 0, void 0, function* () {
        if (!session.pendingUserData) {
            return { success: false, message: "No pending user data" };
        }
        const otp = exports.otpService.generateOtp();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
        session.pendingUserData.otp = otp;
        session.pendingUserData.otpExpiry = otpExpiry;
        yield new Promise((resolve, reject) => {
            session.save((err) => (err ? reject(err) : resolve()));
        });
        return exports.otpService.sendOtpEmail(email, otp);
    }),
    resendOtp: (session) => __awaiter(void 0, void 0, void 0, function* () {
        if (!session.pendingUserData) {
            return { success: false, message: "No pending user data" };
        }
        return exports.otpService.sendOtp(session.pendingUserData.email, session);
    }),
    verifyOtp: (otp, session) => __awaiter(void 0, void 0, void 0, function* () {
        if (!session.pendingUserData) {
            return { success: false, message: "No pending user data" };
        }
        const pendingUser = session.pendingUserData;
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
    }),
};
