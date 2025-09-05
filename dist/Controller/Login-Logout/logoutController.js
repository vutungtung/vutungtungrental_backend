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
exports.logoutUserController = logoutUserController;
const logoutModal_1 = require("../../Modal/Login-Logout/logoutModal");
function logoutUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getrefreshToken = req.cookies["refresh_token"];
            console.log("logout refresh token:", getrefreshToken);
            if (!getrefreshToken) {
                res.status(404).json({
                    message: "Login first",
                    isSuccess: false,
                });
                return;
            }
            const deldata = yield (0, logoutModal_1.checkRefreshToken)(getrefreshToken);
            console.log("data to be deleted", deldata);
            if (deldata !== null) {
                res.clearCookie("refresh_token");
                res.clearCookie("access_token");
                yield (0, logoutModal_1.logoutUserModal)(deldata.email, deldata.password);
                res.status(200).json({
                    message: "Logout Successfuly",
                });
                return;
            }
            res.status(404).json({
                message: "Cannot Logout",
            });
            return;
        }
        catch (error) {
            console.log("Logout error:", error);
            res.status(500).json({
                message: "Server Error: Unable to logout",
            });
            return;
        }
    });
}
