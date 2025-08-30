import { Request, Response } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../Modal/vehicleModal";

export async function createVehicleController(req: Request, res: Response) {
  try {
    const files: any = req.files;

    const image = files?.image?.[0]?.filename ?? req.body.image ?? null;
    const image1 = files?.image1?.[0]?.filename ?? req.body.image1 ?? null;
    const image2 = files?.image2?.[0]?.filename ?? req.body.image2 ?? null;

    const {
      name,
      brand,
      model,
      fuelType,
      licensePlate,
      vin,
      mileage,
      description,
      transmission,
      dailyRate,
      categoryId,
      seatingCapacity,
    } = req.body;

    if (!name) {
      res.status(400).json({ error: "Vehicle name is required" });
      return;
    }
    const vehicle = await createVehicle({
      name,
      brand,
      model,
      fuelType: fuelType as any,
      licensePlate,
      vin,
      mileage: mileage ? Number(mileage) : 0,
      description,
      transmission: transmission as any,
      image,
      image1,
      image2,
      dailyRate: dailyRate ? Number(dailyRate) : 0,
      categoryId: categoryId ? Number(categoryId) : undefined,
      seatingCapacity: seatingCapacity ? Number(seatingCapacity) : 0,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create vehicle",
      details: error instanceof Error ? error.message : error,
    });
  }
}

export async function getVehiclesController(req: Request, res: Response) {
  try {
    const vehicles = await getVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicles",
      details: error instanceof Error ? error.message : error,
    });
  }
}

export async function getVehicleByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const vehicle = await getVehicleById(id);
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found" });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicle",
      details: error instanceof Error ? error.message : error,
    });
  }
}

export async function updateVehicleController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const files: any = req.files;

    // Prioritize uploaded files; fallback to URL from req.body
    const image = files?.image?.[0]?.filename ?? req.body.image ?? undefined;
    const image1 = files?.image1?.[0]?.filename ?? req.body.image1 ?? undefined;
    const image2 = files?.image2?.[0]?.filename ?? req.body.image2 ?? undefined;

    const data = {
      ...req.body,
      image,
      image1,
      image2,
    };

    const vehicle = await updateVehicle(id, data);
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update vehicle",
      details: error instanceof Error ? error.message : error,
    });
  }
}
export async function deleteVehicleController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await deleteVehicle(id);
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete vehicle",
      details: error instanceof Error ? error.message : error,
    });
  }
}
