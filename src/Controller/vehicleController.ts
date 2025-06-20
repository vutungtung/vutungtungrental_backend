import { Request, Response } from "express";
import {
  CreateVehicle,
  DeleteVehicle,
  GetVehicleById,
  GetVehicles,
  UpdateVehicle,
} from "../Modal/vehicleModal";
import { prisma } from "../db";

export async function createVehicle_Controller(req: Request, res: Response) {
  try {
    const vehicle = await CreateVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle" });
  }
}
export async function getVehicles_Controller(req: Request, res: Response) {
  try {
    const vehicles = await GetVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
}
export async function getVehicleById_Controller(req: Request, res: Response) {
  const v_id = parseInt(req.params.v_id);
  try {
    const vehicle = await GetVehicleById(v_id);
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found" });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle" });
  }
}
export async function updateVehicle_Controller(req: Request, res: Response) {
  const v_id = parseInt(req.params.v_id);
  try {
    const updatedVehicle = await UpdateVehicle(v_id, req.body);
    if (!updatedVehicle) {
      res.status(404).json({ error: "Vehicle not found" });
      return;
    }
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update vehicle" });
  }
}

export async function deleteVehicle_Controller(req: Request, res: Response) {
  const v_id = parseInt(req.params.v_id);
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
