import { Router } from "express";
import { createVehicle_Controller } from "../Controller/vehicleController";
// import { 
//   createVehicle_Controller, 
//   getVehicles_Controller, 
//   getVehicleById_Controller, 
//   updateVehicle_Controller, 
//   deleteVehicle_Controller
// } from "../Controller/vehicleController";

const vehicleRouter = Router();

vehicleRouter.post("/", createVehicle_Controller);
// vehicleRouter.get("/", getVehicles_Controller);
// vehicleRouter.get("/:v_id", getVehicleById_Controller);
// vehicleRouter.put("/:v_id", updateVehicle_Controller);
// vehicleRouter.delete("/:v_id", deleteVehicle_Controller);
export { vehicleRouter };
