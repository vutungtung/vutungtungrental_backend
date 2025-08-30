import { prisma } from "../db";
import type {
  VehicleFuelType,
  VehicleStatus,
  VehicleTransmission,
} from "@prisma/client";

// CREATE
export async function createVehicle(data: {
  name: string;
  brand?: string;
  model?: string;
  fuelType?: VehicleFuelType;
  licensePlate?: string;
  vin?: string;
  mileage?: number;
  description?: string;
  transmission?: VehicleTransmission;
  image?: string;
  image1?: string;
  image2?: string;
  dailyRate?: number;
  categoryId?: number;
  seatingCapacity?: number;
}) {
  if (!data.name) throw new Error("Vehicle name is required");

  const vehicleData: any = {
    name: data.name,
    brand: data.brand ?? null,
    model: data.model ?? null,
    fuelType: data.fuelType ?? "PETROL",
    licensePlate: data.licensePlate ?? null,
    vin: data.vin ?? null,
    mileage: data.mileage ?? 0,
    description: data.description ?? null,
    transmission: data.transmission ?? "MANUAL",
    image: data.image ?? null,
    image1: data.image1 ?? null,
    image2: data.image2 ?? null,
    dailyRate: data.dailyRate ?? 0,
    seatingCapacity: data.seatingCapacity ?? 0,
  };

  if (data.categoryId) {
    const categoryExists = await prisma.category.findUnique({
      where: { c_id: data.categoryId },
    });
    if (!categoryExists) throw new Error("Invalid categoryId");
    vehicleData.category = { connect: { c_id: data.categoryId } };
  }

  return prisma.vehicle.create({ data: vehicleData });
}

// READ
export async function getVehicles() {
  return prisma.vehicle.findMany({ include: { category: true } });
}

export async function getVehicleById(id: number) {
  return prisma.vehicle.findUnique({
    where: { v_id: id },
    include: { category: true },
  });
}

// UPDATE
export async function updateVehicle(
  id: number,
  data: {
    name?: string;
    brand?: string;
    model?: string;
    fuelType?: VehicleFuelType;
    licensePlate?: string;
    vin?: string;
    mileage?: number;
    description?: string;
    transmissionType?: VehicleTransmission;
    image?: string;
    image1?: string;
    image2?: string;
    dailyRate?: number;
    categoryId?: number;
    seatingCapacity?: number;
    status?: VehicleStatus;
  }
) {
  try {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.brand) updateData.brand = data.brand;
    if (data.model) updateData.model = data.model;
    if (data.fuelType) updateData.fuelType = data.fuelType;
    if (data.licensePlate) updateData.licensePlate = data.licensePlate;
    if (data.vin) updateData.vin = data.vin;
    if (data.mileage !== undefined) updateData.mileage = data.mileage;
    if (data.description) updateData.description = data.description;
    if (data.transmissionType) updateData.transmission = data.transmissionType;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.image1 !== undefined) updateData.image1 = data.image1;
    if (data.image2 !== undefined) updateData.image2 = data.image2;
    if (data.dailyRate !== undefined) updateData.dailyRate = data.dailyRate;
    if (data.seatingCapacity !== undefined)
      updateData.seatingCapacity = data.seatingCapacity;
    if (data.status) updateData.status = data.status;

    if (data.licensePlate) {
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { licensePlate: data.licensePlate },
      });

      if (existingVehicle && existingVehicle.v_id !== id) {
        throw new Error("License plate already exists for another vehicle");
      }

      updateData.licensePlate = data.licensePlate;
    }

    // Connect category relation if categoryId is provided
    if (data.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { c_id: data.categoryId },
      });
      if (!categoryExists) throw new Error("Invalid categoryId");
      updateData.category = { connect: { c_id: data.categoryId } };
    }

    return await prisma.vehicle.update({
      where: { v_id: id },
      data: updateData,
      include: { category: true }, // optional: include category in response
    });
  } catch (error) {
    console.error("Prisma error (updateVehicle):", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update vehicle"
    );
  }
}
// DELETE
export async function deleteVehicle(id: number) {
  return prisma.vehicle.delete({ where: { v_id: id } });
}
