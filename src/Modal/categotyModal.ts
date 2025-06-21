import { prisma } from "../db";


export async function CreateCategory(data: {
  name: string;
  description?: string;
  imageUrl?: string;
}) {
  return await prisma.category.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
    },
 });
}


export async function GetCategories() {
  return await prisma.category.findMany();
}

export async function GetCategoryById(id: number) {
  return await prisma.category.findUnique({
    where: {
      c_id: id,
    },
  });
}

export async function DeleteCategory(id: number) {
  return await prisma.category.delete({
    where: {
      c_id: id,
    },
  });
}

export async function UpdateCategory(
  id: number,
  data: {
    name?: string;
    description?: string;
    imageUrl?: string;
  }
) {
  return await prisma.category.update({
    where: {
      c_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
    },
  });
}
