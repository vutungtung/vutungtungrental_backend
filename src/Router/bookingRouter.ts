import { Router } from "express";
import { authenMiddleware } from "../loginMiddleware/authMiddleware";
import {
  createBookingController,
  findAllBookingController,
  getUserBookingDetailsController,
} from "../Controller/bookingController";
import { upload } from "../middleware/bookingMulterMiddleware";

const bookingRouter = Router();

bookingRouter.post(
  "/booking",
  authenMiddleware,
  upload.single("licenseImg"),
  createBookingController
);
bookingRouter.get(
  "/bookingdetails",
  authenMiddleware,
  findAllBookingController
);
bookingRouter.get(
  "/user-booking",
  authenMiddleware,
  getUserBookingDetailsController
);

export { bookingRouter };
