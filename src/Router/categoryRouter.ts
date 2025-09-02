import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  getCategoryByNameController,
  updateCategoryController,
  deleteCategoryController,
} from "../Controller/categoryController";

export const categoryRouter = Router();

categoryRouter.post("/create", createCategoryController);
categoryRouter.post("/all", getCategoriesController);
categoryRouter.post("/by-id", getCategoryByIdController);
categoryRouter.post("/by-name", getCategoryByNameController);
categoryRouter.post("/update", updateCategoryController);
categoryRouter.post("/delete", deleteCategoryController);
