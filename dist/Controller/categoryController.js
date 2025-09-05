"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryController = createCategoryController;
exports.getAllCategoryController = getAllCategoryController;
exports.getCategoryByIdController = getCategoryByIdController;
exports.updateCategoryController = updateCategoryController;
exports.deleteCategoryController = deleteCategoryController;
exports.getCategoryByNameController = getCategoryByNameController;
const categoryModal_1 = require("../Modal/categoryModal");
function createCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            if (!name) {
                res.status(400).json({ error: "Category name is required" });
                return;
            }
            const category = yield (0, categoryModal_1.createCategory)({ name });
            res.status(201).json(category);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: error.message || "Failed to create category" });
        }
    });
}
function getAllCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield (0, categoryModal_1.getCategories)();
            res.status(200).json(categories);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: error.message || "Failed to fetch categories" });
        }
    });
}
function getCategoryByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { c_id } = req.params;
            const categoryId = Number(c_id);
            if (isNaN(categoryId)) {
                res.status(400).json({ error: "Invalid category ID" });
                return;
            }
            const category = yield (0, categoryModal_1.getCategoryById)(categoryId);
            if (!category) {
                res.status(404).json({ error: "Category not found" });
                return;
            }
            res.status(200).json(category);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: error.message || "Failed to fetch category" });
        }
    });
}
function updateCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { c_id } = req.params;
            const categoryId = Number(c_id);
            const { name } = req.body;
            const category = yield (0, categoryModal_1.updateCategory)(categoryId, { name });
            res.status(200).json(category);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: error.message || "Failed to update category" });
        }
    });
}
function deleteCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { c_id } = req.params;
            const categoryId = Number(c_id);
            if (isNaN(categoryId)) {
                res.status(400).json({ error: "Invalid category ID" });
                return;
            }
            yield (0, categoryModal_1.deleteCategory)(categoryId);
            res.status(200).json({ message: "Category deleted successfully" });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: error.message || "Failed to delete category" });
        }
    });
}
function getCategoryByNameController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.params;
            if (!name) {
                res.status(400).json({ error: "Category name is required" });
                return;
            }
            const category = yield (0, categoryModal_1.getCategoryByName)(name);
            if (!category) {
                res.status(404).json({ error: "Category not found" });
                return;
            }
            res.status(200).json(category);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: error.message || "Failed to fetch category" });
        }
    });
}
