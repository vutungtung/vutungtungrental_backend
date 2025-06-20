import { prisma } from "../db";

export async function CreateVehicle(data: {
  name: string;
  type: string;
  price: number;
  location: string;
  description: string;
  imageUrl: string;
  userId: number;
}) {
  const createVehicle = await prisma.vehicle.create({
    data: {
      name: data.name,
      type: data.type,
      price: data.price,
      location: data.location,
      description: data.description,
      imageUrl: data.imageUrl,
      userId: data.userId,
    },
  });
  return createVehicle;
}


// export async function GetVehicles() {
//   const data = await prisma.vehicle.findMany();
//   return data;
// }


// export async function GetVehicleById(v_id: number) {
//   const data = await prisma.vehicle.findUnique({
//     where: {
//       v_id: v_id, 
//     },
//   });
//   return data;
// }


// export async function UpdateVehicle(id: number, data: {
//   name: string;
//   type: string;
//   price: number;
//   location: string;
//   description: string;
//   imageUrl: string;
// }) {
//   const updatedVehicle = await prisma.vehicle.update({
//     where: { id: id },
//     data: {
//       name: data.name,
//       type: data.type,
//       price: data.price,
//       location: data.location,
//       description: data.description,
//       imageUrl: data.imageUrl,
//     },
//   });
//   return updatedVehicle;
// }

// // Delete a vehicle
// export async function DeleteVehicle(id: number) {
//   const deletedVehicle = await prisma.vehicle.delete({
//     where: {
//       id: id,
//     },
//   });
//   return deletedVehicle;
// }
