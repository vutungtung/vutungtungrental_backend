"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Directly set upload path to /uploads/bookingLicense
const bookingLicensePath = path_1.default.join(__dirname, "../../uploads/bookingLicense");
// Ensure folder exists
if (!fs_1.default.existsSync(bookingLicensePath)) {
    fs_1.default.mkdirSync(bookingLicensePath, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, bookingLicensePath); // Store files inside /uploads/bookingLicense
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path_1.default.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});
// ✅ Only allow jpg, jpeg, png
const fileFilter = (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    }
    else {
        cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // optional: 5MB
});
