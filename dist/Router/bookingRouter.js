"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../loginMiddleware/authMiddleware");
const bookingController_1 = require("../Controller/bookingController");
const bookingMulterMiddleware_1 = require("../middleware/bookingMulterMiddleware");
const bookingRouter = (0, express_1.Router)();
exports.bookingRouter = bookingRouter;
// http://localhost:4000/vehicle/book/booking/categoryId/vehicleId
bookingRouter.post("/booking/:categoryId/:vehicleId", authMiddleware_1.authenMiddleware, bookingMulterMiddleware_1.upload.single("licenseImg"), bookingController_1.createBookingController);
// for admin:
bookingRouter.get("/bookingdetails/admin", authMiddleware_1.authenMiddleware, bookingController_1.findAllBookingController);
// for users:
bookingRouter.get("/user-booking", authMiddleware_1.authenMiddleware, bookingController_1.getUserBookingDetailsController);
bookingRouter.get("/user-booking/:bookingId", authMiddleware_1.authenMiddleware, bookingController_1.getBookingDetailsById);
//localhost:4000/vehicle/book/cancel-booking/bookingid
http: bookingRouter.post("/cancel-booking/:bookingId", authMiddleware_1.authenMiddleware, bookingController_1.cancelBookingController);
