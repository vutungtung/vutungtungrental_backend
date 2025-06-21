
import { Request, Response } from "express";

import {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategory,
} from "../Modal/categotyModal";


export async function CreateCategory_Conntroller(req: Request, res: Response) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "Request body is missing" });
        return;
    }

    const { name, description, imageUrl } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
       res
        .status(400)
        .json({
          error: "Category name is required and must be a non-empty string",
        });
      return;
    }

    const newCategory = await CreateCategory({
      name: name.trim(),
      description: description ? description.trim() : undefined,
      imageUrl: imageUrl ? imageUrl.trim() : undefined,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("CreateCategory error:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
}


export async function GetCategories_Controller(req: Request, res: Response) {
  try {
    const categories = await GetCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

export async function GetCategoryById_Controller(req: Request, res: Response) {
  const c_id = parseInt(req.params.c_id);
  try {
    const category = await GetCategoryById(c_id);
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

export async function DeleteCategory_Controller(req: Request, res: Response) {
  const c_id = parseInt(req.params.c_id);
  try {
    await DeleteCategory(c_id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
}

export async function UpdateCategory_Controller(req: Request, res: Response) {
  const c_id = parseInt(req.params.c_id);
  const { name, description, imageUrl } = req.body;
  try {
    const updatedCategory = await UpdateCategory(c_id, {
      name,
      description,
      imageUrl,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category" });
  }
}
