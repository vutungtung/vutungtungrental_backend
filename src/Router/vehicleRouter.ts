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

vehicleRouter.get(
  "/category/:categoryName",
  getVehiclesByCategoryNameController
);
vehicleRouter.get("/category/id/:categoryId", getVehicleByCategoryIdController);

// GET /api/vehicles/by-price-range?gte=1000&lte=5000
vehicleRouter.get("/by-price-range", getVehicleByPriceRangeController);

vehicleRouter.get("/:id", getVehicleByIdController);

vehicleRouter.get("/status/:status", getVehiclesByStatusController);
vehicleRouter.get("/name/:name", getVehiclesByNameController);
vehicleRouter.get(
  "/transmission/:transmission",
  getVehicleByTransmissionController
);
vehicleRouter.get("/fuel/:fuelType", getVehicleByFuelTypeController); 

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
