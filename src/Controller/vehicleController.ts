import { Request, Response } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehiclesByCategoryName,
  getVehiclesByCategory,
  getVehiclesByPriceRange,
  getVehiclesByStatus,
  getVehicleByName,
  getVehiclesByTransmission,
  getVehiclesByFuelType,
} from "../Modal/vehicleModal";
import {
  VehicleFuelType,
  VehicleStatus,
  VehicleTransmission,
} from "@prisma/client";
import { prisma } from "../db";

// Create vehicle
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

// Get all vehicles
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

// Get vehicle by ID
export async function getVehicleByIdController(req: Request, res: Response) {
  try {
    const v_id = Number(req.body.v_id); // ✅ match schema field

    if (isNaN(v_id)) {
      res.status(400).json({
        error: "Invalid ID",
        details: "v_id must be a number",
      });
      return;
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { v_id },
      include: { category: true },
    });

    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found" });
      return;
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch vehicle",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Update vehicle
export async function updateVehicleController(req: Request, res: Response) {
  try {
    const v_id = Number(req.body.v_id);

    if (isNaN(v_id)) {
      res.status(400).json({
        error: "Invalid ID",
        details: "v_id must be a number",
      });
      return;
    }

    const files: any = req.files;
    const image = files?.image?.[0]?.filename ?? req.body.image ?? undefined;
    const image1 = files?.image1?.[0]?.filename ?? req.body.image1 ?? undefined;
    const image2 = files?.image2?.[0]?.filename ?? req.body.image2 ?? undefined;

    const data = { ...req.body, image, image1, image2 };

    const vehicle = await updateVehicle(v_id, data);
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update vehicle",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Delete vehicle
export async function deleteVehicleController(req: Request, res: Response) {
  try {
    const v_id = Number(req.body.v_id);

    if (isNaN(v_id)) {
      res.status(400).json({
        error: "Invalid ID",
        details: "v_id must be a number",
      });
      return;
    }

    await deleteVehicle(v_id);
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete vehicle",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Get by category name
export async function getVehiclesByCategoryNameController(
  req: Request,
  res: Response
) {
  try {
    const { categoryName } = req.body;
    const vehicles = await getVehiclesByCategoryName(categoryName);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicles by category name",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Get by category ID
export async function getVehicleByCategoryIdController(
  req: Request,
  res: Response
) {
  try {
    const categoryId = Number(req.body.categoryId);
    const vehicles = await getVehiclesByCategory(categoryId);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicles by category ID",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Get by price range
export async function getVehicleByPriceRangeController(
  req: Request,
  res: Response
) {
  try {
    const gte = req.body.gte ? parseFloat(req.body.gte) : 0;
    const lte = req.body.lte
      ? parseFloat(req.body.lte)
      : Number.MAX_SAFE_INTEGER;

    if (isNaN(gte) || isNaN(lte)) {
      res.status(400).json({
        error: "Invalid price range",
        details: "'gte' and 'lte' must be numbers",
      });
      return;
    }
    if (gte > lte) {
      res.status(400).json({
        error: "Invalid price range",
        details: "'gte' must be <= 'lte'",
      });
      return;
    }

    const vehicles = await getVehiclesByPriceRange(gte, lte);
    if (!vehicles.length) {
      res
        .status(200)
        .json({ message: "No vehicles found in this price range", data: [] });
      return;
    }
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch vehicles by price range",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Get by status
export async function getVehiclesByStatusController(
  req: Request,
  res: Response
) {
  try {
    const status = req.body.status as VehicleStatus;
    const vehicles = await getVehiclesByStatus(status);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicles by status",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Get by name
export async function getVehiclesByNameController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const vehicles = await getVehicleByName(name);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicles by name",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Get by transmission
export async function getVehicleByTransmissionController(
  req: Request,
  res: Response
) {
  try {
    const transmission = req.body.transmission as VehicleTransmission;
    const vehicles = await getVehiclesByTransmission(transmission);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicles by transmission",
      details: error instanceof Error ? error.message : error,
    });
  }
}

// Get by fuel type
export async function getVehicleByFuelTypeController(
  req: Request,
  res: Response
) {
  try {
    const fuelType = req.body.fuelType as VehicleFuelType;
    const validFuelTypes: VehicleFuelType[] = [
      "PETROL",
      "DIESEL",
      "ELECTRIC",
      "HYBRID",
    ];

    if (!validFuelTypes.includes(fuelType)) {
      res.status(400).json({
        error: "Invalid fuel type",
        details: `Allowed values are: ${validFuelTypes.join(", ")}`,
      });
      return;
    }

    const vehicles = await getVehiclesByFuelType(fuelType);
    if (!vehicles || vehicles.length === 0) {
      res.status(200).json({
        message: `No vehicles found with fuel type '${fuelType}'`,
        data: [],
      });
      return;
    }
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch vehicles by fuel type",
      details: error instanceof Error ? error.message : error,
    });
  }
}
