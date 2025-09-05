"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = generateRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.generateAccessToken = generateAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// importing jwt secrete code from env file
const JWT_SECRET = process.env.JWT_SECRET || "";
if (!JWT_SECRET) {
    throw new Error("Enter the jwt secerete token");
}
// generating the jwt refresh token
const EXPIRE_REFRESH_TOKEN = 7 * 24 * 60 * 60;
function generateRefreshToken(loadToken) {
    const rToken = (0, jsonwebtoken_1.sign)(loadToken, JWT_SECRET, {
        expiresIn: EXPIRE_REFRESH_TOKEN,
    });
    return rToken;
}
// verifying the refresh token
function verifyRefreshToken(refreshToken) {
    const checkRefresh = (0, jsonwebtoken_1.verify)(refreshToken, JWT_SECRET);
    return checkRefresh;
}
// generating access token
const EXPIRE_ACCESS_TOKEN = 150;
function generateAccessToken(loadToken) {
    const aToken = (0, jsonwebtoken_1.sign)(loadToken, JWT_SECRET, {
        expiresIn: EXPIRE_ACCESS_TOKEN,
    });
    return aToken;
}
// verifying the access token
function verifyAccessToken(accessToken) {
    const checkAccess = (0, jsonwebtoken_1.verify)(accessToken, JWT_SECRET);
    return checkAccess;
}
