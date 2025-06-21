import { Router } from "express";
import {
  CreateCategory_Conntroller,
  DeleteCategory_Controller,
  GetCategories_Controller,
  GetCategoryById_Controller,
  UpdateCategory_Controller,
} from "../Controller/categoryController";

export const categoryRouter = Router();

categoryRouter.post("/", CreateCategory_Conntroller);
categoryRouter.get("/", GetCategories_Controller);
categoryRouter.get("/:c_id", GetCategoryById_Controller);
categoryRouter.put("/:c_id", UpdateCategory_Controller);
categoryRouter.delete("/:c_id", DeleteCategory_Controller);
