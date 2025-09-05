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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./Router/userRouter");
const loginRouter_1 = require("./Router/loginRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const vehicleRouter_1 = require("./Router/vehicleRouter");
const categoryRouter_1 = require("./Router/categoryRouter");
const bookingRouter_1 = require("./Router/bookingRouter");
const express_session_1 = __importDefault(require("express-session"));
const resetPasswordRoutes_1 = __importDefault(require("./Router/resetPasswordRoutes"));
const path_1 = __importDefault(require("path"));
const vehicleModal_1 = require("./Modal/vehicleModal");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 4000;
dotenv_1.default.config();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.JWT_SECRET || "somesecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 15 * 60 * 1000 }, // 15 min
}));
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        if (req.session && typeof req.session.save === "function") {
            req.session.save((err) => {
                if (err)
                    console.error("Session save error:", err);
                originalSend.call(this, body);
            });
        }
        else {
            originalSend.call(this, body);
        }
        return this;
    };
    next();
});
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads/bookingLicense")));
app.use("/user", userRouter_1.userRouter);
app.use("/userlogin", loginRouter_1.loginRouter);
app.use("/userlogout", loginRouter_1.logoutRouter);
app.use("/userlogin/reset-password", resetPasswordRoutes_1.default);
app.use("/vehicle/book", bookingRouter_1.bookingRouter);
app.use("/api/vehicles", vehicleRouter_1.vehicleRouter);
app.use("/api/category", categoryRouter_1.categoryRouter);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.use(express_1.default.urlencoded({ extended: true }));
// Simple route to view uploaded images
// to check if images are uploaded successfully
// Access via: http://localhost:4000/view-images
app.get("/:v_id/view-images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.v_id);
    const vehicle = yield (0, vehicleModal_1.getVehicleById)(id);
    if (!vehicle) {
        res.status(404).json({ error: "Vehicle not found" });
        return;
    }
    let html = "<h1>Vehicle Images</h1>";
    html += `<div>
    <h3>${vehicle.name}</h3>
      <img src="/uploads/vehicles/${vehicle.image}" width="300"/><br/>
      <img src="/uploads/vehicles/${vehicle.image1}" width="300"/><br/>
      <img src="/uploads/vehicles/${vehicle.image2}" width="300"/><br/>
    </div><hr/>`;
    res.send(html);
}));
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
