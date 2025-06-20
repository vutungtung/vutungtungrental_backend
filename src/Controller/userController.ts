import { error } from "console";
import { createUser, getALlUserMdoal, updateUserModal } from "../Modal/userModal";
import { Request, Response } from "express";

// new user creation controller
const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const register = await createUser({username,email,password});
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

// update User

const updateUserController = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const userIdParam = req.params.userId || req.params.id; // adjust key as per your route
        const userId = Number(userIdParam);
        if (isNaN(userId)) {
             res.status(400).json({ message: "Invalid user ID" });
             return
        }
        // console.log(userId);
        const update = await updateUserModal(userId, { username, email, password });
        res.status(200).json(update);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "unable to update"
        });
    }
}

export { createUserController, getAllUserController,updateUserController };
