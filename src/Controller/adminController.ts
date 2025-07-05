import { Request, Response } from "express";
import { createOwner } from "../Modal/adminModal";
import { Role } from "@prisma/client";

const createAdmin = async (
  username: string,
  email: string,
  password: string,

  res: Response
) => {
  try {
    console.log("data entered:", username, email, password);
    if ((username || email || password) === null) {
      res.status(401).json({
        message: "Enter all data to register",
      });
    }

    const registerAdmin = await createOwner({
      username,
      email,
      password,
    });
    if (!registerAdmin) {
      res.status(404).json({
        message: "Unable to create admin",
        isSuccess: false,
      });
    }
    res.status(200).json({
      message: "user has been registered as admin",
      isSuccess: true,
    });
  } catch (err) {
    console.log("This is the error", err);
    res.status(500).json({
      message: "Server Error: Unable to create the admin",
      isSuccess: false,
    });
  }
};

export { createAdmin };
