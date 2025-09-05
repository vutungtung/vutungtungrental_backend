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
exports.loginUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const loginModal_1 = require("../../Modal/Login-Logout/loginModal");
const jwtToken_1 = require("../../loginMiddleware/jwtToken");
const expireTime_1 = require("../../loginMiddleware/expireTime");
const passwordHashing_1 = require("../../Utils/passwordHashing");
dotenv_1.default.config();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        // Check both user and admin tables
        const [user, admin] = yield Promise.all([
            (0, loginModal_1.checkExistingUser)(email),
            (0, loginModal_1.checkExistingAdmin)(email),
        ]);
        if (!user && !admin) {
            res.status(401).json({ message: "Incorrect email or password" });
            return;
        }
        // Determine account and password
        const account = user !== null && user !== void 0 ? user : admin;
        if (!account.password) {
            res.status(500).json({ message: "No password found for account" });
            return;
        }
        const isValid = yield (0, passwordHashing_1.comparePassword)(password, account.password);
        if (!isValid) {
            res.status(400).json({ message: "Password did not match" });
            return;
        }
        // Check if already logged in
        const loggedIn = yield (0, loginModal_1.checkAlreadyLoggedIn)(email);
        if (loggedIn) {
            res.status(401).json({ message: "Cannot login twice" });
            return;
        }
        // Determine if it's an admin or user login
        const isAdmin = !!admin;
        const userId = Number((_a = user === null || user === void 0 ? void 0 : user.userId) !== null && _a !== void 0 ? _a : admin === null || admin === void 0 ? void 0 : admin.adminId);
        const role = isAdmin ? "admin" : "user";
        // Create token payload
        const userPayload = {
            userId,
            role,
        };
        // Generate tokens
        const refreshToken = (0, jwtToken_1.generateRefreshToken)(userPayload);
        const accessToken = (0, jwtToken_1.generateAccessToken)(userPayload);
        // Set cookies
        res.cookie("refresh_token", refreshToken, {
            path: "/",
            sameSite: "lax",
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + expireTime_1.EXPIRE_REFRESH_TOKEN * 1000),
        });
        res.cookie("access_token", accessToken, {
            path: "/",
            secure: true,
            sameSite: "lax",
            httpOnly: true,
            expires: new Date(Date.now() + expireTime_1.EXPIRE_ACCESS_TOKEN * 1000),
        });
        // Store login record
        const createLogin = yield (0, loginModal_1.careeteLoginModal)({
            userId: (_b = user === null || user === void 0 ? void 0 : user.userId) !== null && _b !== void 0 ? _b : null,
            adminId: (_c = admin === null || admin === void 0 ? void 0 : admin.adminId) !== null && _c !== void 0 ? _c : null,
            email,
            password: account.password,
            refreshToken,
            role,
        });
        res.status(200).json({
            message: "Logged In",
            role,
            data: createLogin,
        });
        return;
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Unable to login" });
        return;
    }
});
exports.loginUser = loginUser;
