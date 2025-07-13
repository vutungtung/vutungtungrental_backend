import { Request, Response } from "express";
import { checkformRefreshToken } from "../Modal/Login-Logout/loginModal";
import { getAdminByID } from "../Modal/adminModal";
import {
  createBooking,
  getAllBookingModal,
  getSpecificBookingModal,
} from "../Modal/bookingModal";
import { getUserByEmail } from "../Modal/userModal";

const createBookingController = async (req: Request, res: Response) => {
  try {
    const checkLogin = req.cookies["refresh_token"];
    console.log("refresh token:", checkLogin);
    if (!checkLogin) {
      res.status(401).json({
        message: "Login first to book vehicle",
        isSuccess: false,
      });
    }
    const getemail = await checkformRefreshToken(checkLogin);
    const email = String(getemail?.email);
    const useremail = String(getemail?.email);
    console.log("user email:", useremail);
    const user = await getUserByEmail(email);
    const username = String(user?.username || "newUser");
    const getAdminID = Number(getemail?.adminId);
    const getadmin = await getAdminByID(getAdminID);
    const ownername = String(getadmin?.ownername || "vutungtung");
    const {
      pickuplocation,
      droplocation,
      paymentMethod,
      bookingDate,
      returnDate,
      vehicleId,
      categoryId,
      price,
    } = req.body;
    console.log("body data:", req.body);

    const booking = await createBooking({
      username,
      ownername,
      bookingDate,
      returnDate,
      useremail,
      vehicleId,
      categoryId,
      price,
      pickuplocation,
      droplocation,
      paymentMethod,
    });

    if (!booking) {
      res.status(404).json({
        message: "Failed to create booking",
        isSuccess: false,
      });
    }
    res.status(200).json({
      message: "Booking details:",
      data: booking,
      isSuccess: true,
    });
    return;
  } catch (err) {
    console.log("thia is the error:", err);
    res.status(500).json({
      message: "Server Error:Unable to create the booking",
      isSuccess: false,
    });
    return;
  }
};

const getAllBookingDetails = async (req: Request, res: Response) => {
  try {
    const getCookies = req.cookies["refresh_token"];
    console.log(getCookies);
    const getBooking = await getAllBookingModal();
    if (!getBooking) {
      res.status(404).json({
        message: "Unable to fetch booking details",
        isSuccess: false,
      });
    }
    res.status(200).json({
      message: "All booking details",
      data: getBooking,
      isSuccess: true,
    });
  } catch {
    res.status(500).json({
      message: "Server Error:Cannot get the booking details ",
    });
  }
};
const getSpecificBooking = async (req: Request, res: Response) => {
  try {
    const { username, useremail, vehicleId } = req.body;
    const searchBooking = await getSpecificBookingModal({
      username,
      useremail,
      vehicleId,
    });
    if (!searchBooking) {
      res.status(404).json({
        message: "Cannot get the booking details:",
        isSuccess: false,
      });
      return;
    }
    res.status(200).json({
      message: " Booking details",
      data: searchBooking,
      isSuccess: true,
    });
    return;
  } catch {
    res.status(500).json({
      message: "Server Error:Cannot get the booking details",
      isSuccess: false,
    });
    return;
  }
};

export { createBookingController, getAllBookingDetails, getSpecificBooking };
