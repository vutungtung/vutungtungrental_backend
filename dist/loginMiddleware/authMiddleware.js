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
exports.authenMiddleware = authenMiddleware;
const jwtToken_1 = require("./jwtToken");
const expireTime_1 = require("./expireTime");
function authenMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authenHeader = req.headers.authorization || req.cookies["refresh_token"];
            if (!authenHeader) {
                res.status(401).json({
                    message: "Token are not found in header",
                });
                return;
            }
            if (typeof authenHeader !== "string") {
                res.status(401).json({
                    message: "Token is not in string",
                });
            }
            const refreshToekn = authenHeader;
            // check the token
            const payload = (0, jwtToken_1.verifyRefreshToken)(refreshToekn);
            const checkRefreshToken = yield ({
                refreshToekn: authenHeader
            });
            if (!checkRefreshToken) {
                res.status(401).json({
                    message: "Cannot find the token"
                });
                return;
            }
            const newAccessToken = (0, jwtToken_1.generateAccessToken)({ userId: payload.userId, role: payload.role });
            //  const EXPIRE_ACCESS_TOKEN = 150;
            res.cookie("access_token", newAccessToken, {
                path: '/',
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + expireTime_1.EXPIRE_ACCESS_TOKEN * 1000)
            });
            req.user = {
                userId: payload.userId,
                role: payload.role
            };
            next();
        }
        catch (error) {
            console.error(error);
            if (error.name === "TokenExpiredError") {
                next({
                    status: 400,
                    message: "Token expired",
                });
                return;
            }
            if (error.name === "JsonWebTokenError") {
                next({
                    status: 400,
                    message: "Invalid token",
                });
                return;
            }
            next({ message: "Internal server error", status: 500 });
        }
    });
}
