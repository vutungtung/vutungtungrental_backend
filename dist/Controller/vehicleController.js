"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVehicleController = createVehicleController;
exports.getVehiclesController = getVehiclesController;
exports.getVehicleByIdController = getVehicleByIdController;
exports.updateVehicleController = updateVehicleController;
exports.deleteVehicleController = deleteVehicleController;
exports.getVehiclesByCategoryNameController = getVehiclesByCategoryNameController;
exports.getVehicleByCategoryIdController = getVehicleByCategoryIdController;
exports.getVehicleByPriceRangeController = getVehicleByPriceRangeController;
exports.getVehiclesByStatusController = getVehiclesByStatusController;
exports.getVehiclesByNameController = getVehiclesByNameController;
exports.getVehicleByTransmissionController = getVehicleByTransmissionController;
exports.getVehicleByFuelTypeController = getVehicleByFuelTypeController;
const vehicleModal_1 = require("../Modal/vehicleModal");
const db_1 = require("../db");
function createVehicleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        try {
            const files = req.files;
            const image = (_d = (_c = (_b = (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.filename) !== null && _c !== void 0 ? _c : req.body.image) !== null && _d !== void 0 ? _d : null;
            const image1 = (_h = (_g = (_f = (_e = files === null || files === void 0 ? void 0 : files.image1) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.filename) !== null && _g !== void 0 ? _g : req.body.image1) !== null && _h !== void 0 ? _h : null;
            const image2 = (_m = (_l = (_k = (_j = files === null || files === void 0 ? void 0 : files.image2) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.filename) !== null && _l !== void 0 ? _l : req.body.image2) !== null && _m !== void 0 ? _m : null;
            const { name, brand, model, fuelType, licensePlate, vin, mileage, description, transmission, dailyRate, categoryId, seatingCapacity, } = req.body;
            if (!name) {
                res.status(400).json({ error: "Vehicle name is required" });
                return;
            }
            const vehicle = yield (0, vehicleModal_1.createVehicle)({
                name,
                brand,
                model,
                fuelType: fuelType,
                licensePlate,
                vin,
                mileage: mileage ? Number(mileage) : 0,
                description,
                transmission: transmission,
                image,
                image1,
                image2,
                dailyRate: dailyRate ? Number(dailyRate) : 0,
                categoryId: categoryId ? Number(categoryId) : undefined,
                seatingCapacity: seatingCapacity ? Number(seatingCapacity) : 0,
            });
            res.status(201).json(vehicle);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                error: "Failed to create vehicle",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehiclesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vehicles = yield (0, vehicleModal_1.getVehicles)();
            res.status(200).json(vehicles);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehicleByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const v_id = Number(req.params.v_id);
            if (isNaN(v_id)) {
                res
                    .status(400)
                    .json({ error: "Invalid ID", details: "v_id must be a number" });
                return;
            }
            const vehicle = yield db_1.prisma.vehicle.findUnique({
                where: { v_id },
                include: { category: true },
            });
            if (!vehicle) {
                res.status(404).json({ error: "Vehicle not found" });
                return;
            }
            res.status(200).json(vehicle);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicle",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function updateVehicleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        try {
            const v_id = Number(req.params.v_id);
            if (isNaN(v_id)) {
                res
                    .status(400)
                    .json({ error: "Invalid ID", details: "v_id must be a number" });
                return;
            }
            const files = req.files;
            const image = (_d = (_c = (_b = (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.filename) !== null && _c !== void 0 ? _c : req.body.image) !== null && _d !== void 0 ? _d : undefined;
            const image1 = (_h = (_g = (_f = (_e = files === null || files === void 0 ? void 0 : files.image1) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.filename) !== null && _g !== void 0 ? _g : req.body.image1) !== null && _h !== void 0 ? _h : undefined;
            const image2 = (_m = (_l = (_k = (_j = files === null || files === void 0 ? void 0 : files.image2) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.filename) !== null && _l !== void 0 ? _l : req.body.image2) !== null && _m !== void 0 ? _m : undefined;
            const data = Object.assign(Object.assign({}, req.body), { image, image1, image2 });
            const vehicle = yield (0, vehicleModal_1.updateVehicle)(v_id, data);
            res.status(200).json(vehicle);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                error: "Failed to update vehicle",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function deleteVehicleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const v_id = Number(req.params.v_id);
            if (isNaN(v_id)) {
                res
                    .status(400)
                    .json({ error: "Invalid ID", details: "v_id must be a number" });
                return;
            }
            yield (0, vehicleModal_1.deleteVehicle)(v_id);
            res.status(200).json({ message: "Vehicle deleted successfully" });
        }
        catch (error) {
            res
                .status(500)
                .json({
                error: "Failed to delete vehicle",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehiclesByCategoryNameController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryName } = req.params;
            const vehicles = yield (0, vehicleModal_1.getVehiclesByCategoryName)(categoryName);
            res.status(200).json(vehicles);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles by category name",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehicleByCategoryIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = Number(req.params.categoryId);
            const vehicles = yield (0, vehicleModal_1.getVehiclesByCategory)(categoryId);
            res.status(200).json(vehicles);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles by category ID",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehicleByPriceRangeController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gte = req.params.gte ? parseFloat(req.params.gte) : 0;
            const lte = req.params.lte
                ? parseFloat(req.params.lte)
                : Number.MAX_SAFE_INTEGER;
            if (isNaN(gte) || isNaN(lte)) {
                res
                    .status(400)
                    .json({
                    error: "Invalid price range",
                    details: "'gte' and 'lte' must be numbers",
                });
                return;
            }
            if (gte > lte) {
                res
                    .status(400)
                    .json({
                    error: "Invalid price range",
                    details: "'gte' must be <= 'lte'",
                });
                return;
            }
            const vehicles = yield (0, vehicleModal_1.getVehiclesByPriceRange)(gte, lte);
            if (!vehicles.length) {
                res
                    .status(200)
                    .json({ message: "No vehicles found in this price range", data: [] });
                return;
            }
            res.status(200).json(vehicles);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles by price range",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehiclesByStatusController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const status = req.params.status;
            const vehicles = yield (0, vehicleModal_1.getVehiclesByStatus)(status);
            res.status(200).json(vehicles);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles by status",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehiclesByNameController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.params;
            const vehicles = yield (0, vehicleModal_1.getVehicleByName)(name);
            res.status(200).json(vehicles);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles by name",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehicleByTransmissionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transmission = req.params.transmission;
            const vehicles = yield (0, vehicleModal_1.getVehiclesByTransmission)(transmission);
            res.status(200).json(vehicles);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles by transmission",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
function getVehicleByFuelTypeController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fuelType = req.params.fuelType;
            const validFuelTypes = [
                "PETROL",
                "DIESEL",
                "ELECTRIC",
                "HYBRID",
            ];
            if (!validFuelTypes.includes(fuelType)) {
                res
                    .status(400)
                    .json({
                    error: "Invalid fuel type",
                    details: `Allowed values are: ${validFuelTypes.join(", ")}`,
                });
                return;
            }
            const vehicles = yield (0, vehicleModal_1.getVehiclesByFuelType)(fuelType);
            if (!vehicles || vehicles.length === 0) {
                res
                    .status(200)
                    .json({
                    message: `No vehicles found with fuel type '${fuelType}'`,
                    data: [],
                });
                return;
            }
            res.status(200).json(vehicles);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                error: "Failed to fetch vehicles by fuel type",
                details: error instanceof Error ? error.message : error,
            });
        }
    });
}
