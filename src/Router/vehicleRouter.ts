import { Router } from "express";
import {
  createVehicle_Controller,
  getVehicles_Controller,
  // getVehicleById_Controller,
  updateVehicle_Controller,
  deleteVehicle_Controller,
  getVehicleByName_Controller,
  GetVehicleByCategoryName_Controller,
  GetVehicleByPrice_Controller,
} from "../Controller/vehicleController";

const vehicleRouter = Router();

vehicleRouter.post("/create", createVehicle_Controller);
vehicleRouter.get("/", getVehicles_Controller);
vehicleRouter.put("/update", updateVehicle_Controller);
vehicleRouter.delete("/delete", deleteVehicle_Controller);
vehicleRouter.get("/name", getVehicleByName_Controller);
vehicleRouter.get("/categoryName", GetVehicleByCategoryName_Controller);
vehicleRouter.get("/price", GetVehicleByPrice_Controller);
export { vehicleRouter };
