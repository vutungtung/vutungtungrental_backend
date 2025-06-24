import { Request, Response } from "express";
import {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategory,
} from "../Modal/categotyModal";
import { json } from "stream/consumers";
import { error } from "console";

export async function CreateCategoryConntroller(req: Request, res: Response) {
  const { name, description, imageUrl, price } = req.body;
  try {
    const category = await CreateCategory({
      name,
      description,
      imageUrl,
      price,
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category" });
  }
}

export async function GetCategoriesController(req: Request, res: Response) {
  try {
    const categories = await GetCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

export async function GetCategoryByIdController(req: Request, res: Response) {
  const { c_id } = req.body;
  const categoryId = parseInt(c_id);

  if (isNaN(categoryId)) {
    res.status(400).json({ error: "Invalid category ID" });
    return;
  }

  try {
    const category = await GetCategoryById(categoryId);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
}

export async function DeleteCategoryController(req: Request, res: Response) {
  const { c_id } = req.body;
  const categoryId = parseInt(c_id);

  if (isNaN(categoryId)) {
    res.status(400).json({ error: "Invalid category ID" });
    return;
  }

  try {
    await DeleteCategory(categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
}

export async function UpdateCategoryController(req: Request, res: Response) {
  const { c_id, name, description, imageUrl, price } = req.body;
  const categoryId = parseInt(c_id);

  if (isNaN(categoryId)) {
    res.status(400).json({ error: "Invalid category ID" });
    return;
  }

  try {
    const updatedCategory = await UpdateCategory(categoryId, {
      name,
      description,
      imageUrl,
      price,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category" });
  }
}

export async function GetCategoryByNameController(
  req: Request,
  res: Response
) {
  const name = req.body.name;
  try {
    const categories = await GetCategories();
    const filteredCategory = categories.filter(
      (categories) =>
        categories.name &&
        categories.name.toLocaleLowerCase().includes(name.toLowerCase())
    );
    if (filteredCategory.length === 0) {
      res.status(404).json({
        error: "No Categories Found",
      });
      return;
    }
    res.status(200).json(filteredCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
}
