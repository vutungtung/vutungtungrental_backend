import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../Controller/categoryController";

export const categoryRouter = Router();

// Create a new category
categoryRouter.post("/create", createCategoryController);

// Get all categories
categoryRouter.get("/", getCategoriesController);

// Get category by id
categoryRouter.get("/:c_id", getCategoryByIdController);

// Update category by id
categoryRouter.put("/update/:c_id", updateCategoryController);

// Delete category by id
categoryRouter.delete("/delete/:c_id", deleteCategoryController);
