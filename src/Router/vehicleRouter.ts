import { Router } from "express";
import { createVehicleController, deleteVehicleController, GetVehicleByCategoryNameController, getVehicleByNameController, GetVehicleByPriceController, getVehiclesController, updateVehicleController } from "../Controller/vehicleController";

const vehicleRouter = Router();

vehicleRouter.post("/create", createVehicleController);
vehicleRouter.get("/", getVehiclesController);
vehicleRouter.put("/update", updateVehicleController);
vehicleRouter.delete("/delete", deleteVehicleController);
vehicleRouter.get("/name", getVehicleByNameController);
vehicleRouter.get("/categoryName", GetVehicleByCategoryNameController);
vehicleRouter.get("/price", GetVehicleByPriceController);
export { vehicleRouter };
