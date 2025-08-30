// import { prisma } from "../db";

// export async function CreateCategory(data: {
//   name: string;
//   description?: string;
//   imageUrl?: string;
//   price: number;
// }) {
//   return await prisma.category.create({
//     data: {
//       name: data.name,
//       description: data.description ?? "",
//       imageUrl: data.imageUrl ?? "",
//       price: data.price,
//     },
//   });
// }

// export async function GetCategories() {
//   return await prisma.category.findMany();
// }

// export async function GetCategoryById(id: number) {
//   return await prisma.category.findUnique({
//     where: {
//       c_id: id,
//     },
//   });
// }

// export async function DeleteCategory(id: number) {
//   return await prisma.category.delete({
//     where: {
//       c_id: id,
//     },
//   });
// }

// export async function UpdateCategory(
//   id: number,
//   data: {
//     name?: string;
//     description?: string;
//     imageUrl?: string;
//     price: number;
//   }
// ) {
//   return await prisma.category.update({
//     where: {
//       c_id: id,
//     },
//     data: {
//       name: data.name,
//       description: data.description,
//       imageUrl: data.imageUrl,
//       price: data.price,
//     },
//   });
// }

// export async function GetCategoryByName(name: string) {
//   return await prisma.category.findMany({
//     where: {
//       name: {
//         contains: name,
//       },
//     },
//   });
// }

import { prisma } from "../db";

// Create a category
export async function createCategory(data: { name: string }) {
  try {
    return await prisma.category.create({
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    console.error("Prisma error (createCategory):", error);
    throw new Error("Failed to create category");
  }
}

// Get all categories
export async function getCategories() {
  return await prisma.category.findMany();
}

// Get category by id
export async function getCategoryById(c_id: number) {
  return await prisma.category.findUnique({ where: { c_id } });
}

// Update category
export async function updateCategory(c_id: number, data: { name?: string }) {
  try {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;

    return await prisma.category.update({ where: { c_id }, data: updateData });
  } catch (error) {
    console.error("Prisma error (updateCategory):", error);
    throw new Error("Failed to update category");
  }
}

// Delete category
export async function deleteCategory(c_id: number) {
  return await prisma.category.delete({ where: { c_id } });
}
