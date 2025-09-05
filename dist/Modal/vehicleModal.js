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
exports.createVehicle = createVehicle;
exports.getVehicles = getVehicles;
exports.getVehicleById = getVehicleById;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle = deleteVehicle;
exports.getVehicleByName = getVehicleByName;
exports.getVehiclesByPriceRange = getVehiclesByPriceRange;
exports.getVehiclesByStatus = getVehiclesByStatus;
exports.getVehiclesByCategory = getVehiclesByCategory;
exports.getVehiclesByCategoryName = getVehiclesByCategoryName;
exports.getVehiclesByTransmission = getVehiclesByTransmission;
exports.getVehiclesByFuelType = getVehiclesByFuelType;
const db_1 = require("../db");
const library_1 = require("@prisma/client/runtime/library");
// CREATE
function createVehicle(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (!data.name)
            throw new Error("Vehicle name is required");
        const vehicleData = {
            name: data.name,
            brand: (_a = data.brand) !== null && _a !== void 0 ? _a : null,
            model: (_b = data.model) !== null && _b !== void 0 ? _b : null,
            fuelType: (_c = data.fuelType) !== null && _c !== void 0 ? _c : "PETROL",
            licensePlate: (_d = data.licensePlate) !== null && _d !== void 0 ? _d : null,
            vin: (_e = data.vin) !== null && _e !== void 0 ? _e : null,
            mileage: (_f = data.mileage) !== null && _f !== void 0 ? _f : 0,
            description: (_g = data.description) !== null && _g !== void 0 ? _g : null,
            transmission: (_h = data.transmission) !== null && _h !== void 0 ? _h : "MANUAL",
            image: (_j = data.image) !== null && _j !== void 0 ? _j : null,
            image1: (_k = data.image1) !== null && _k !== void 0 ? _k : null,
            image2: (_l = data.image2) !== null && _l !== void 0 ? _l : null,
            dailyRate: (_m = data.dailyRate) !== null && _m !== void 0 ? _m : 0,
            seatingCapacity: (_o = data.seatingCapacity) !== null && _o !== void 0 ? _o : 0,
        };
        if (data.categoryId) {
            const categoryExists = yield db_1.prisma.category.findUnique({
                where: { c_id: data.categoryId },
            });
            if (!categoryExists)
                throw new Error("Invalid categoryId");
            vehicleData.category = { connect: { c_id: data.categoryId } };
        }
        return db_1.prisma.vehicle.create({ data: vehicleData });
    });
}
// READ
function getVehicles() {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({ include: { category: true } });
    });
}
function getVehicleById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findUnique({
            where: {
                v_id: id,
            },
            include: {
                category: true,
            },
        });
    });
}
// UPDATE
function updateVehicle(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateData = {};
            if (data.name)
                updateData.name = data.name;
            if (data.brand)
                updateData.brand = data.brand;
            if (data.model)
                updateData.model = data.model;
            if (data.fuelType)
                updateData.fuelType = data.fuelType;
            if (data.licensePlate)
                updateData.licensePlate = data.licensePlate;
            if (data.vin)
                updateData.vin = data.vin;
            if (data.mileage !== undefined)
                updateData.mileage = data.mileage;
            if (data.description)
                updateData.description = data.description;
            if (data.transmissionType)
                updateData.transmission = data.transmissionType;
            if (data.image !== undefined)
                updateData.image = data.image;
            if (data.image1 !== undefined)
                updateData.image1 = data.image1;
            if (data.image2 !== undefined)
                updateData.image2 = data.image2;
            if (data.dailyRate !== undefined)
                updateData.dailyRate = data.dailyRate;
            if (data.seatingCapacity !== undefined)
                updateData.seatingCapacity = data.seatingCapacity;
            if (data.status)
                updateData.status = data.status;
            if (data.licensePlate) {
                const existingVehicle = yield db_1.prisma.vehicle.findUnique({
                    where: { licensePlate: data.licensePlate },
                });
                if (existingVehicle && existingVehicle.v_id !== id) {
                    throw new Error("License plate already exists for another vehicle");
                }
                updateData.licensePlate = data.licensePlate;
            }
            if (data.categoryId) {
                const categoryExists = yield db_1.prisma.category.findUnique({
                    where: { c_id: data.categoryId },
                });
                if (!categoryExists)
                    throw new Error("Invalid categoryId");
                updateData.category = { connect: { c_id: data.categoryId } };
            }
            return yield db_1.prisma.vehicle.update({
                where: { v_id: id },
                data: updateData,
                include: { category: true },
            });
        }
        catch (error) {
            console.error("Prisma error (updateVehicle):", error);
            throw new Error(error instanceof Error ? error.message : "Failed to update vehicle");
        }
    });
}
// DELETE
function deleteVehicle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.delete({ where: { v_id: id } });
    });
}
//Get by name
function getVehicleByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({
            where: { name },
            include: { category: true },
        });
    });
}
// Get vehicles by price range
function getVehiclesByPriceRange(gte, lte) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({
            where: {
                dailyRate: {
                    gte: new library_1.Decimal(gte),
                    lte: new library_1.Decimal(lte),
                },
            },
            orderBy: { dailyRate: "asc" },
            include: { category: true },
        });
    });
}
//get by status
function getVehiclesByStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({
            where: { status },
            include: { category: true },
        });
    });
}
//get by category
function getVehiclesByCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({
            where: { categoryId },
            include: { category: true },
        });
    });
}
//get by category name
function getVehiclesByCategoryName(categoryName) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({
            where: {
                category: {
                    name: categoryName,
                },
            },
            include: { category: true },
        });
    });
}
//get by transmission
function getVehiclesByTransmission(transmission) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({
            where: { transmission },
            include: { category: true },
        });
    });
}
//get by fuel type
function getVehiclesByFuelType(fuelType) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.vehicle.findMany({
            where: { fuelType },
            include: { category: true },
        });
    });
}
