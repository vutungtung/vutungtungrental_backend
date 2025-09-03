import { Router } from "express";
import { authenMiddleware } from "../loginMiddleware/authMiddleware";
import {
  cancelBookingController,
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
bookingRouter.post(
  "/cancel-booking",
  authenMiddleware,
  cancelBookingController
);
export { bookingRouter };
