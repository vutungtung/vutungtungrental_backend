import { prisma } from "../db";

// Create a new Vehicle
export async function CreateVehicle(data: {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}) {
  const createVehicle = await prisma.vehicle.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
    },
  });
  return createVehicle;
}

// Get all Vehicles
export async function GetVehicles() {
  const data = await prisma.vehicle.findMany();
  return data;
}

// Get Vehicle by ID
export async function GetVehicleById(id: number) {
  const data = await prisma.vehicle.findUnique({
    where: {
      v_id: id,
    },
  });
  return data;
}

// Update Vehicle
export async function UpdateVehicle(
  id: number,
  data: {
    name?: string;
    type?: string;
    price?: number;
    location?: string;
    description?: string;
    imageUrl?: string;
  }
) {
  const updatedVehicle = await prisma.vehicle.update({
    where: { v_id: id },
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
    },
  });
  return updatedVehicle;
}

// Delete Vehicle
export async function DeleteVehicle(id: number) {
  const deletedVehicle = await prisma.vehicle.delete({
    where: {
      v_id: id,
    },
  });
  return deletedVehicle;
}

// Get By Vehicle Name

export async function GetVehicleByName(name: string) {
  const data = await prisma.vehicle.findMany({
    where: {
      name: {
        contains: name,

        },
    },
  });
  return data;
}

// Get Vehicle by categoryId
export async function GetVehicleByCategoryId(categoryId: number) {
  const data = await prisma.vehicle.findMany({
    where: {
      categoryId: categoryId,
    },
  });
  return data;
}