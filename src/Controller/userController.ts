import { error } from "console";
import {
  createUser,
  deleteUserModal,
  getALlUserMdoal,
  getUserByEmail,
  updateUserModal,
} from "../Modal/userModal";
import { Request, Response } from "express";

// new user creation controller
const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const register = await createUser({ username, email, password });
    if (!register) {
      res.status(404).json({
        message: "Unable to create check user input",
      });
    }
    res.status(200).json({
      data: register,
      message: "Register Successfuly",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      message: "Server error while creating user",
    });
  }
  return;
};

// get all user
const getAllUserController = async (req: Request, res: Response) => {
  try {
    const getData = await getALlUserMdoal();
    if (!getData) {
      res.status(400).json({ message: "cannot get the data" });
    }
    res.status(200).json(getData);
  } catch (err) {
    res.status(500).json({
      message: "No data found",
    });
  }

  return;
};

// update User from email

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const update = await updateUserModal({username,email,password});
    console.log(update)
    res.status(200).json(update);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "unable to update",
    });
  }
};

// delete user from email and password

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // finding the email in user table
    const findUser = await getUserByEmail(email);
    if (!findUser) {
      res.status(404).json({
        message: " Register first to delete User",
      });
    }
    // check user and passeword and delete
    const deleteUser = await deleteUserModal(email, password);
    if (!deleteUser) {
      res.status(404).json({
        message: "Unable to delete the user",
      });
    }
    res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "unable to delete the user",
    });
  }
};

export {
  createUserController,
  getAllUserController,
  updateUserController,
  deleteUserController,
};
