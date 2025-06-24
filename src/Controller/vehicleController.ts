import { Request, Response } from "express";
import {
  CreateVehicle,
  DeleteVehicle,
  GetVehicles,
  UpdateVehicle,
  GetVehicleByName,
  GetVehicleByPrice,
  GetVehicleByCategoryName,
} from "../Modal/vehicleModal";

export async function createVehicleController(req: Request, res: Response) {
  try {
    const vehicle = await CreateVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Failed to create vehicle" });
  }
}

export async function getVehiclesController(req: Request, res: Response) {
  try {
    const vehicles = await GetVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
}

export async function updateVehicleController(req: Request, res: Response) {
  const { v_id, name, description, imageUrl, price, categoryId, categoryName } =
    req.body;

  const vehicleId = parseInt(v_id);

  if (isNaN(vehicleId)) {
    res.status(400).json({ error: "Invalid Vehicle ID" });
    return;
  }

  try {
    const updatedVehicle = await UpdateVehicle(vehicleId, {
      name,
      description,
      imageUrl,
      price,
      categoryId,
      categoryName,
    });

    res.status(200).json(updatedVehicle);
  } catch (error: any) {
    console.error("Error updating vehicle:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to update vehicle" });
  }
}

export async function deleteVehicleController(req: Request, res: Response) {
  const v_id = parseInt(req.body.v_id);
  if (isNaN(v_id)) {
    res.status(400).json({ error: "Invalid vehicle ID" });
    return;
  }

  try {
    const vehicle = await DeleteVehicle(v_id);
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found" });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
}

export async function getVehicleByNameController(req: Request, res: Response) {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Invalid or missing vehicle name" });
    return;
  }

  try {
    const vehicles = await GetVehicleByName(name);
    if (vehicles.length === 0) {
      res.status(404).json({ error: "No vehicles found with that name" });
      return;
    }
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
}

export async function GetVehicleByCategoryNameController(
  req: Request,
  res: Response
) {
  const { categoryName } = req.body;
  if (!categoryName || typeof categoryName !== "string") {
    res.status(400).json({ error: "Invalid or missing category name" });
    return;
  }

  try {
    const vehicles = await GetVehicleByCategoryName(categoryName);
    if (vehicles.length === 0) {
      res.status(404).json({ error: "No vehicles found for this category" });
      return;
    }
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
}

export async function GetVehicleByPriceController(
  req: Request,
  res: Response
) {
  const price = parseFloat(req.body.price);
  if (isNaN(price)) {
    res.status(400).json({ error: "Invalid price value" });
    return;
  }

  try {
    const vehicles = await GetVehicleByPrice(price);
    if (vehicles.length === 0) {
      res.status(404).json({ error: "No vehicles found at this price" });
    }
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
}
