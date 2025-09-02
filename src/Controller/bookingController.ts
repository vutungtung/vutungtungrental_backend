import { Request, Response } from "express";
import {
  createBooking,
  getAllBookingModal,
  getUserBookingModal,
} from "../Modal/bookingModal";
import { checkformRefreshToken } from "../Modal/Login-Logout/loginModal";
import { getUserByEmail } from "../Modal/userModal";
import { getVehicleById } from "../Modal/vehicleModal";
import { getCategoryById } from "../Modal/categoryModal";

const createBookingController = async (req: Request, res: Response) => {
  try {
    const {
      licenseNo,
      vehicleId,
      bookingDate,
      returnDate,
      categoryId,
      price,
      pickuplocation,
      droplocation,
      paymentMethod,
    } = req.body;

    const licenseImg = req.file
      ? `/uploads/bookingLicense/${req.file.filename}`
      : null;
    if (licenseImg === null) {
      res.status(400).json({
        message: "License required to rent",
        success: false,
      });
      return;
    }
    // check if user logged in or not
    const loginData = await req.cookies["refresh_token"];
    if (!loginData) {
      res.status(401).json({
        message: "Login first to rent the vehicle",
      });
      return;
    }
    // get the logged in user data from the login table
    const getUser = await checkformRefreshToken(loginData);
    const useremail = String(getUser?.email);

    const vechId = Number(vehicleId);
    const vechName = await getVehicleById(vechId);
    const vehicleName = String(vechName?.name);
    const categId = Number(categoryId);
    const catName = await getCategoryById(categId);
    const categoryName = String(catName?.name);
    // getting user name
    const findUserName = await getUserByEmail(useremail);
    const username = String(findUserName?.username);
    const initiate = await createBooking({
      useremail,
      licenseImg,
      licenseNo,
      vechId,
      bookingDate,
      returnDate,
      categId,
      price,
      pickuplocation,
      droplocation,
      paymentMethod,
      username,
      vehicleName,
      categoryName,
    });
    res.status(200).json({
      message: "Rented vehicle Success",
    });
    return;
  } catch (err) {
    console.log("Rent the vehicle error:", err);
    res.status(500).json({
      message: "Failed to rent the vehicle",
      success: false,
    });
    return;
  }
};
// get all booking controller user must be logged in and role must be admin
const findAllBookingController = async (req: Request, res: Response) => {
  try {
    const loginData = req.cookies["refresh_token"];
    if (!loginData) {
      res.status(401).json({
        message: "Login first ",
      });
      return;
    }
    const getUser = await checkformRefreshToken(loginData);
    if (getUser?.role !== "admin") {
      res.status(401).json({
        message: "You are not admin",
      });
      return;
    }
    const getBooking = await getAllBookingModal();
    if (!getBooking) {
      res.status(400).json({
        message: "No booking founds",
      });
      return;
    }
    res.status(200).json({
      message: "All bookings:",
      data: getBooking,
    });
    return;
  } catch (err) {
    console.log("get all bookings error:", err);
    res.status(404).json({
      message: "Failed to get the bookings",
    });
    return;
  }
};
// get booking details to specific user
const getUserBookingDetailsController = async (req: Request, res: Response) => {
  try {
    const loginData = await req.cookies["refresh_token"];
    if (!loginData) {
      res.status(401).json({
        message: "Login first ",
      });
      return;
    }
    const getUser = await checkformRefreshToken(loginData);
    const email = String(getUser?.email);
    const getUserBooking = await getUserBookingModal(email);
    if (!getUserBooking) {
      res.status(400).json({ message: "No bookings found" });
    }
    res.status(200).json({
      message: "Your Bookings",
      data: getUserBooking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get booking",
    });
  }
};
export {
  createBookingController,
  findAllBookingController,
  getUserBookingDetailsController,
};
