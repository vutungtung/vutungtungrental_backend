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
exports.createUser = createUser;
exports.getALlUserMdoal = getALlUserMdoal;
exports.updateUserModal = updateUserModal;
exports.deleteUserModal = deleteUserModal;
exports.getUserByEmail = getUserByEmail;
exports.pendingUserModal = pendingUserModal;
const db_1 = require("../db");
// temp user-data
function pendingUserModal(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return {
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role,
            };
        }
        catch (error) {
            console.log("pending user error:", error);
            return null;
        }
    });
}
// create user
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = yield db_1.prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    verified: true,
                },
            });
            return user;
        }
        catch (error) {
            console.error("Error in userService.createUser:", error);
            return null;
        }
    });
}
//get user
function getALlUserMdoal() {
    return __awaiter(this, void 0, void 0, function* () {
        const getusers = yield db_1.prisma.user.findMany();
        console.log("get all users datas:", getusers);
        return getusers;
    });
}
function updateUserModal(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield db_1.prisma.user.updateMany({
            where: {
                email: data.email,
            },
            data: {
                username: data.username,
                password: data.password,
            },
        });
        return update;
    });
}
// delete user
function deleteUserModal(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteUser = yield db_1.prisma.user.delete({
            where: {
                email: email,
            },
        });
        return deleteUser;
    });
}
// get user from email
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const findUser = yield db_1.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        return findUser;
    });
}
