import { prisma } from "../db";

// Create a new Vehicle
export async function CreateVehicle(data: {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  categoryId: number;
  categoryName: string;
}) {
  return await prisma.vehicle.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description ?? "",
      imageUrl: data.imageUrl ?? "",
      categoryId: data.categoryId,
      categoryName: data.categoryName,
    },
  });
}

// Get all Vehicles
export async function GetVehicles() {
  const data = await prisma.vehicle.findMany();
  return data;
}


// Update Vehicle
export async function UpdateVehicle(
  id: number,
  data: {
    name?: string;
    price?: number;
    description?: string;
    imageUrl?: string;
    categoryId?: number;
    categoryName?: string;
  }
) {
  const updateData: any = {};
  
  if (data.name !== undefined) updateData.name = data.name;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.categoryName !== undefined) updateData.categoryName = data.categoryName;

  const updatedVehicle = await prisma.vehicle.update({
    where: { v_id: id },
    data: updateData,
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

// Get Vehicle by Category Name
export async function GetVehicleByCategoryName(categoryName: string) {
  const data = await prisma.vehicle.findMany({
    where: {
      categoryName: {
        contains: categoryName,
      },
    },
  });
  return data;
}

// Get Vehicle by Price
export async function GetVehicleByPrice(price: number) {
  const data = await prisma.vehicle.findMany({
    where: {
      price: {
        gte: price,
      },
    },
  });
  return data;
}
