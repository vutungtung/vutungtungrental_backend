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
exports.resetPasswordController = void 0;
const resetPasswordModal_1 = require("../../Modal/Login-Logout/resetPasswordModal");
const passwordHashing_1 = require("../../Utils/passwordHashing");
exports.resetPasswordController = {
    sendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const result = yield resetPasswordModal_1.resetPasswordService.sendOtp(email, req.session);
                res.json(result);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield resetPasswordModal_1.resetPasswordService.resendOtp(req.session);
                res.json(result);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = req.body;
                const result = yield resetPasswordModal_1.resetPasswordService.verifyOtp(otp, req.session);
                res.json(result);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newPassword, confirmPassword } = req.body;
                // Check if passwords match
                if (newPassword !== confirmPassword) {
                    res.status(400).json({
                        message: "New Password and Confirm Password didn't match",
                    });
                    return;
                }
                if (!req.session) {
                    res.status(400).json({ message: "Session not found" });
                    return;
                }
                const hashedPassword = yield (0, passwordHashing_1.hashPassword)(newPassword);
                console.log("this is hashed passowrd:", hashedPassword);
                // Call the reset password service
                const result = yield resetPasswordModal_1.resetPasswordService.resetPassword(hashedPassword, req.session);
                res.status(200).json(result);
                return;
            }
            catch (err) {
                res.status(400).json({ error: err.message });
                return;
            }
        });
    },
};
