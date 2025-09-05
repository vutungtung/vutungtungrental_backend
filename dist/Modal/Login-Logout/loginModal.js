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
exports.careeteLoginModal = careeteLoginModal;
exports.checkAlreadyLoggedIn = checkAlreadyLoggedIn;
exports.checkExistingUser = checkExistingUser;
exports.checkExistingAdmin = checkExistingAdmin;
exports.checkformRefreshToken = checkformRefreshToken;
const db_1 = require("../../db");
// store login details
function careeteLoginModal(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("data in the model:", data.adminId, data.email);
        const create = db_1.prisma.login.createMany({
            data: {
                userId: data.userId,
                adminId: data.adminId,
                refreshToken: data.refreshToken,
                email: data.email,
                password: data.password,
                role: data.role,
            },
        });
        console.log("data to be stored in the database:", create);
        return create;
    });
}
// check already login or not
function checkAlreadyLoggedIn(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const findUser = yield db_1.prisma.login.findFirst({
            where: {
                email: email,
            },
        });
        return findUser;
    });
}
// check user register already or not
function checkExistingUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const findUser = yield db_1.prisma.user.findFirst({
            where: {
                email: email,
            },
            select: {
                password: true,
                userId: true,
                email: true,
            },
        });
        console.log(findUser);
        return findUser;
    });
}
function checkExistingAdmin(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const findAdmin = yield db_1.prisma.admin.findFirst({
            where: {
                email: email,
            },
            select: {
                adminId: true,
                passowrd: true,
                email: true,
            },
        });
        // console.log(findUser)
        return findAdmin;
    });
}
function checkformRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const findemail = yield db_1.prisma.login.findFirst({
            where: {
                refreshToken: refreshToken,
            },
        });
        return findemail;
    });
}
