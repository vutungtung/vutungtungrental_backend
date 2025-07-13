import { Router } from "express";
import { authenMiddleware } from "../Middleware/authMiddleware";
import {
  createBookingController,
  getAllBookingDetails,
  getSpecificBooking,
} from "../Controller/bookingController";
const bookingRouter = Router();

bookingRouter.post("/booking", authenMiddleware, createBookingController);
bookingRouter.get("/bookingdetails", authenMiddleware, getAllBookingDetails);
bookingRouter.get("/searchbooking", getSpecificBooking);

export { bookingRouter };
