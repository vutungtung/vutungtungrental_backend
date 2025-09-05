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
exports.findAdminByEmail = exports.getAdminController = exports.createAdmin = void 0;
const adminModal_1 = require("../Modal/adminModal");
const createAdmin = (username, email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("data entered:", username, email, password);
        if ((username || email || password) === null) {
            res.status(401).json({
                message: "Enter all data to register",
            });
        }
        const registerAdmin = yield (0, adminModal_1.createOwner)({
            username,
            email,
            password,
        });
        if (!registerAdmin) {
            res.status(404).json({
                message: "Unable to create admin",
                isSuccess: false,
            });
        }
        res.status(200).json({
            message: "user has been registered as admin",
            isSuccess: true,
        });
    }
    catch (err) {
        console.log("This is the error", err);
        res.status(500).json({
            message: "Server Error: Unable to create the admin",
            isSuccess: false,
        });
    }
});
exports.createAdmin = createAdmin;
const getAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getData = yield (0, adminModal_1.getAllAdmin)();
        if (!getData) {
            res.status(404).json({
                message: "No admin found",
                isSuccess: false,
            });
            return;
        }
        res.status(200).json({
            message: "All Admin Listed Below:",
            data: getData,
            isSuccess: true,
        });
        return;
    }
    catch (_a) {
        res.status(500).json({
            message: "Server Error:",
        });
        return;
    }
});
exports.getAdminController = getAdminController;
const findAdminByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, ownername } = req.body;
        const getData = yield (0, adminModal_1.getSpecificAdmin)(email, ownername);
        if (!getData) {
            res.status(400).json({
                message: "Cannot find the admin",
                isSuccess: false,
            });
        }
        res.status(200).json({
            message: "The requested data:",
            data: getData,
            isSuccess: false,
        });
    }
    catch (_a) {
        res.status(500).json({
            message: "Server Error:Unable to get the admin ",
            isSuccess: false,
        });
    }
});
exports.findAdminByEmail = findAdminByEmail;
