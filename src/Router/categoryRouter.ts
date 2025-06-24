import { Router } from "express";
import {
  CreateCategoryConntroller,
  DeleteCategoryController,
  GetCategoriesController,
  GetCategoryByNameController,
  UpdateCategoryController,
} from "../Controller/categoryController";

export const categoryRouter = Router();

categoryRouter.post("/create", CreateCategoryConntroller);
categoryRouter.get("/", GetCategoriesController);
categoryRouter.delete("/delete", DeleteCategoryController);
categoryRouter.put("/update", UpdateCategoryController);
categoryRouter.get("/name", GetCategoryByNameController);
