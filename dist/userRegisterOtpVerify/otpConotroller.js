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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtpController = exports.verifyOtpController = void 0;
const otpService_1 = require("./otpService");
const userModal_1 = require("../Modal/userModal");
const adminModal_1 = require("../Modal/adminModal");
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        if (!otp) {
            res.status(400).json({ success: false, message: "OTP is required" });
            return;
        }
        if (!req.session.pendingUserData) {
            res.status(400).json({ success: false, message: "No pending user data" });
            return;
        }
        const result = yield otpService_1.otpService.verifyOtp(otp, req.session);
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        const data = yield req.session.pendingUserData;
        if (data.role === "admin") {
            const newAdmin = yield (0, adminModal_1.createOwner)(req.session.pendingUserData);
        }
        console.log("data to be store in table", data);
        const newUser = yield (0, userModal_1.createUser)(req.session.pendingUserData);
        if (!newUser) {
            res
                .status(500)
                .json({ success: false, message: "Failed to create user" });
            return;
        }
        // Clear session after user created
        req.session.pendingUserData = null;
        req.session.email = undefined;
        yield new Promise((resolve, reject) => req.session.save((err) => (err ? reject(err) : resolve())));
        res.json({
            success: true,
            message: "User registered successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (err) {
        console.error("verifyOtpController error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.verifyOtpController = verifyOtpController;
const resendOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.pendingUserData) {
            res.status(400).json({ success: false, message: "No pending user data" });
            return;
        }
        const result = yield otpService_1.otpService.resendOtp(req.session);
        if (!result.success) {
            res.status(500).json(result);
            return;
        }
        res.json({ success: true, message: "OTP resent successfully" });
    }
    catch (err) {
        console.error("resendOtpController error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.resendOtpController = resendOtpController;
