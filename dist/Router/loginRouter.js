"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = exports.loginRouter = void 0;
const express_1 = require("express");
const loginController_1 = require("../Controller/Login-Logout/loginController");
const logoutController_1 = require("../Controller/Login-Logout/logoutController");
const loginRouter = (0, express_1.Router)();
exports.loginRouter = loginRouter;
const logoutRouter = (0, express_1.Router)();
exports.logoutRouter = logoutRouter;
// user login
loginRouter.post("/", loginController_1.loginUser);
// logout
logoutRouter.post("/", logoutController_1.logoutUserController);
