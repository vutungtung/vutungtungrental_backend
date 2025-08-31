
import { Request, Response } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../Modal/categoryModal";


// Create category
export async function createCategoryController(req: Request, res: Response) {
  const { name } = req.body;
  try {
    const category = await createCategory({
      name
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category" });
  }
}

// Get all categories
export async function getCategoriesController(req: Request, res: Response) {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Controller error (getCategories):", error);
    res.status(500).json({ error: "Failed to get categories" });
  }
}

// Get category by id
export async function getCategoryByIdController(req: Request, res: Response) {
  const { c_id } = req.body;
  const categoryId = parseInt(c_id);

  if (isNaN(categoryId)) {
    res.status(400).json({ error: "Invalid category ID" });
    return;
  }

  try {
    const category = await getCategoryById(categoryId);
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

// Update category
export async function updateCategoryController(req: Request, res: Response) {
  try {
    const c_id = Number(req.params.c_id);
    const { name } = req.body;

    const category = await updateCategory(c_id, { name });
    res.status(200).json(category);
  } catch (error) {
    console.error("Controller error (updateCategory):", error);
    res.status(500).json({ error: "Failed to update category" });
  }
}

// Delete category
export async function deleteCategoryController(req: Request, res: Response) {
  try {
    const c_id = Number(req.params.c_id);
    await deleteCategory(c_id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Controller error (deleteCategory):", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
}

