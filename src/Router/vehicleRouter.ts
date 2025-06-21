import { Router } from "express";
import {
  createVehicle_Controller,
  getVehicles_Controller,
  getVehicleById_Controller,
  updateVehicle_Controller,
  deleteVehicle_Controller,
  getVehicleByName_Controller,
  GetVehicleByCategoryId_Controller,
} from "../Controller/vehicleController";

const vehicleRouter = Router();

vehicleRouter.post("/create", createVehicle_Controller);
vehicleRouter.get("/", getVehicles_Controller);
vehicleRouter.get("/:v_id", getVehicleById_Controller);
vehicleRouter.put("/:v_id", updateVehicle_Controller);
vehicleRouter.delete("/:v_id", deleteVehicle_Controller);
vehicleRouter.get("/name/:name", getVehicleByName_Controller);
vehicleRouter.get("/category/:categoryId", GetVehicleByCategoryId_Controller);
export { vehicleRouter };
