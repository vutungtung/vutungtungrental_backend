import { Router } from "express";

import {
  createVehicleController,
  getVehiclesController,
  getVehicleByIdController,
  updateVehicleController,
  deleteVehicleController,
} from "../Controller/vehicleController";
import upload from "../middleware/multerMiddleware";

export const vehicleRouter = Router();

// Create with multiple image upload
vehicleRouter.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  createVehicleController
);

vehicleRouter.get("/", getVehiclesController);
vehicleRouter.get("/:id", getVehicleByIdController);

vehicleRouter.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateVehicleController
);

vehicleRouter.delete("/delete/:id", deleteVehicleController);
