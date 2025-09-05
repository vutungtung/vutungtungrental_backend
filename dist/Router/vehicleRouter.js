"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const express_1 = require("express");
const vehicleController_1 = require("../Controller/vehicleController");
const multerMiddleware_1 = __importDefault(require("../middleware/multerMiddleware"));
exports.vehicleRouter = (0, express_1.Router)();
exports.vehicleRouter.post("/create", multerMiddleware_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
]), vehicleController_1.createVehicleController);
exports.vehicleRouter.get("/", vehicleController_1.getVehiclesController);
exports.vehicleRouter.get("/id/:v_id", vehicleController_1.getVehicleByIdController);
exports.vehicleRouter.put("/update/:v_id", multerMiddleware_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
]), vehicleController_1.updateVehicleController);
exports.vehicleRouter.delete("/delete/:v_id", vehicleController_1.deleteVehicleController);
exports.vehicleRouter.get("/category/name/:categoryName", vehicleController_1.getVehiclesByCategoryNameController);
exports.vehicleRouter.get("/category/:categoryId", vehicleController_1.getVehicleByCategoryIdController);
exports.vehicleRouter.get("/price/:gte/:lte", vehicleController_1.getVehicleByPriceRangeController);
exports.vehicleRouter.get("/status/:status", vehicleController_1.getVehiclesByStatusController);
exports.vehicleRouter.get("/name/:name", vehicleController_1.getVehiclesByNameController);
exports.vehicleRouter.get("/transmission/:transmission", vehicleController_1.getVehicleByTransmissionController);
exports.vehicleRouter.get("/fuel/:fuelType", vehicleController_1.getVehicleByFuelTypeController);
