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
import { sendMail } from "../userRegisterOtpVerify/nodeMailer";

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
    await sendMail(
      useremail,
      "booking details",
      `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rent Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 3px solid #4a90e2;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
            margin-top: 20px;
        }
        .details-container {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eeeeee;
        }
        .detail-label {
            font-weight: bold;
            color: #555555;
        }
        .detail-value {
            text-align: right;
        }
        .price {
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999999;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 12px;
            background-color: #4a90e2;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            vertical-align: middle;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">VutungTung</div>
    </div>
    
    <div class="content">
        <h2>Your Rental is Confirmed!</h2>
        <p>Dear ${username},</p>
        <p>Thank you for choosing our vutungtung. Your booking has been confirmed. Below are the details of your reservation:</p>
        
        <div class="details-container">
            <div class="detail-row">
                <span class="detail-label">Vehicle:</span>
                <span class="detail-value">${vehicleName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Booking Date:</span>
                <span class="detail-value">${bookingDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Return Date:</span>
                <span class="detail-value">${returnDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Pick-up Location:</span>
                <span class="detail-value">${pickuplocation}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Drop-off Location:</span>
                <span class="detail-value">${droplocation}</span>
            </div>
        </div>
        
        <div class="price">Total: ${price}</div>
        
        <a href="#" class="button">View Booking Details</a>
        
        <p>Please bring your driver's license, proof of insurance, and a credit card in your name when you pick up the vehicle.</p>
        <p>If you have any questions or need to modify your reservation, please contact us at support@vutungtung .</p>
        
        <p>We look forward to serving you!</p>
        <p>The VutungTung Team</p>
    </div>
    
    <div class="footer">
        <p>© 2023 VutungTung. All rights reserved.</p>
        <p>Butwal-3,Goalpark,Nepal</p>
        <p>You're receiving this email because you made a booking with VutungTung.</p>
    </div>
</body>
</html>`
    );
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
