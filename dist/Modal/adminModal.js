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
exports.createOwner = createOwner;
exports.getAllAdmin = getAllAdmin;
exports.getSpecificAdmin = getSpecificAdmin;
exports.updateAdmin = updateAdmin;
exports.getAdminByID = getAdminByID;
const db_1 = require("../db");
function createOwner(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("data in modal:", data.email, data.username, data.password);
        const newOwner = yield db_1.prisma.admin.create({
            data: {
                ownername: data.username,
                email: data.email,
                passowrd: data.password,
            },
        });
        return newOwner;
    });
}
function getAllAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const getdata = yield db_1.prisma.admin.findMany();
        return getdata;
    });
}
function getSpecificAdmin(email, ownername) {
    return __awaiter(this, void 0, void 0, function* () {
        const findAdmin = yield db_1.prisma.admin.findFirst({
            where: {
                email: email,
                ownername: ownername,
            },
        });
        return findAdmin;
    });
}
function updateAdmin(ownername, email, passowrd, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield db_1.prisma.admin.update({
            where: {
                email: email,
            },
            data: {
                ownername: ownername,
                passowrd: passowrd,
                role: role,
            },
        });
        return update;
    });
}
function getAdminByID(adminId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getAdmin = yield db_1.prisma.admin.findUnique({
            where: {
                adminId: adminId,
            },
        });
        return getAdmin;
    });
}
