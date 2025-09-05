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
exports.logoutUserModal = logoutUserModal;
exports.checkRefreshToken = checkRefreshToken;
const db_1 = require("../../db");
function logoutUserModal(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const logout = yield db_1.prisma.login.deleteMany({
            where: {
                email: email,
                password: password,
            },
        });
        return logout;
    });
}
function checkRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkRefresh = yield db_1.prisma.login.findFirst({
            where: {
                refreshToken: refreshToken,
            },
            select: {
                email: true,
                password: true,
            },
        });
        console.log("modal refresh token data:", checkRefresh);
        // if (checkRefresh !== null) {
        //     const deleteLogin = await prisma.login.deleteMany({
        //         where: {
        //             refreshToken: refreshToken,
        //         },
        //     });
        //     return deleteLogin;
        // }
        return checkRefresh;
    });
}
