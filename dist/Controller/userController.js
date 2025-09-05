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
exports.deleteUserController = exports.updateUserController = exports.getAllUserController = exports.createUserController = void 0;
const userModal_1 = require("../Modal/userModal");
const adminModal_1 = require("../Modal/adminModal");
const dotenv_1 = __importDefault(require("dotenv"));
const otpService_1 = require("../userRegisterOtpVerify/otpService");
const passwordHashing_1 = require("../Utils/passwordHashing");
dotenv_1.default.config();
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = yield (0, passwordHashing_1.hashPassword)(password);
        const pendingUserData = yield (0, userModal_1.pendingUserModal)({
            username,
            email,
            password: hashedPassword,
            role,
        });
        if (!pendingUserData) {
            res
                .status(500)
                .json({ success: false, message: "Pending user creation failed" });
            return;
        }
        // ✅ Save pending user in session
        req.session.pendingUserData = pendingUserData;
        req.session.email = email;
        const otpResult = yield otpService_1.otpService.sendOtp(email, req.session);
        if (!otpResult.success) {
            res.status(500).json({ success: false, message: otpResult.message });
            return;
        }
        res.status(201).json({
            success: true,
            message: "OTP sent to your email. Please verify to create your account.",
        });
    }
    catch (error) {
        console.error("Error in createUserController:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.createUserController = createUserController;
// get all user
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getData = yield (0, userModal_1.getALlUserMdoal)();
        console.log("get all user data controler:", getData);
        if (!getData) {
            res.status(400).json({ message: "cannot get the data" });
        }
        res.status(200).json(getData);
        return;
    }
    catch (err) {
        console.log("catch block error:", err);
        res.status(500).json({
            message: "No data found",
        });
    }
    return;
});
exports.getAllUserController = getAllUserController;
// update User from email
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, ownername } = req.body;
        const findUser = yield (0, userModal_1.getUserByEmail)(email);
        const findAdmin = yield (0, adminModal_1.getSpecificAdmin)(email);
        if (findUser) {
            const update = yield (0, userModal_1.updateUserModal)({ username, email, password });
            console.log(update);
            res.status(200).json({
                message: "User Updated:",
                data: update,
                isSuccess: true,
            });
        }
        else if (findAdmin) {
            const update = yield (0, adminModal_1.updateAdmin)(ownername, email, password);
            res.status(200).json({
                message: "Admin Updated",
                data: update,
                isSuccess: true,
            });
            return;
        }
        res.status(400).json({
            message: "Unable to update ",
            isSuccess: false,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "unable to update",
        });
    }
});
exports.updateUserController = updateUserController;
// delete user from email and password
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // finding the email in user table
        const findUser = yield (0, userModal_1.getUserByEmail)(email);
        if (!findUser) {
            res.status(404).json({
                message: " Register first to delete User",
            });
        }
        console.log("user::", findUser);
        if (password !== (findUser === null || findUser === void 0 ? void 0 : findUser.password)) {
            res.status(400).json({ message: "Password didn't match" });
        }
        // check user and passeword and delete
        const deleteUser = yield (0, userModal_1.deleteUserModal)(email);
        console.log("delet data of user:", deleteUser);
        if (!deleteUser) {
            res.status(404).json({
                message: "Unable to delete the user",
            });
        }
        res.status(200).json({
            message: "User deleted",
        });
    }
    catch (err) {
        console.log("data delete error:", err);
        res.status(500).json({
            message: "unable to delete the user",
        });
    }
});
exports.deleteUserController = deleteUserController;
