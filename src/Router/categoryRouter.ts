import { Router } from "express";
import {
  CreateCategory_Conntroller,
  DeleteCategory_Controller,
  GetCategories_Controller,
  GetCategoryByName_Controller,
  UpdateCategory_Controller,
} from "../Controller/categoryController";

export const categoryRouter = Router();

categoryRouter.post("/create", CreateCategory_Conntroller);
categoryRouter.get("/", GetCategories_Controller);
categoryRouter.delete("/delete", DeleteCategory_Controller);
categoryRouter.put("/update", UpdateCategory_Controller);
categoryRouter.get("/name", GetCategoryByName_Controller);
