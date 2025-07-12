import { Router } from "express";
import { authenMiddleware } from "../Middleware/authMiddleware";
import { createBookingController } from "../Controller/bookingController";
const bookingRouter = Router();

bookingRouter.post("/booking", authenMiddleware, createBookingController);

export { bookingRouter };
