import { Router } from "express";
import {
  createVehicleController,
  getVehiclesController,
  getVehicleByIdController,
  updateVehicleController,
  deleteVehicleController,
  getVehiclesByCategoryNameController,
  getVehicleByCategoryIdController,
  getVehicleByPriceRangeController,
  getVehiclesByNameController,
  getVehiclesByStatusController,
  getVehicleByTransmissionController,
  getVehicleByFuelTypeController,
} from "../Controller/vehicleController";
import upload from "../middleware/multerMiddleware";

export const vehicleRouter = Router();

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
vehicleRouter.post("/by-id", getVehicleByIdController);
vehicleRouter.put(
  "/update",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateVehicleController
);
vehicleRouter.delete("/delete", deleteVehicleController);
vehicleRouter.post("/by-category-name", getVehiclesByCategoryNameController);
vehicleRouter.post("/by-category-id", getVehicleByCategoryIdController);
vehicleRouter.post("/by-price-range", getVehicleByPriceRangeController);
vehicleRouter.post("/by-status", getVehiclesByStatusController);
vehicleRouter.post("/by-name", getVehiclesByNameController);
vehicleRouter.post("/by-transmission", getVehicleByTransmissionController);
vehicleRouter.post("/by-fuel", getVehicleByFuelTypeController);
