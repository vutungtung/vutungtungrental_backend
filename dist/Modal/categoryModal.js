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
exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.getCategoryById = getCategoryById;
exports.getCategoryByName = getCategoryByName;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const db_1 = require("../db");
// Create a category
function createCategory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield db_1.prisma.category.create({
                data: {
                    name: data.name,
                },
            });
        }
        catch (error) {
            console.error("Prisma error (createCategory):", error);
            throw new Error("Failed to create category");
        }
    });
}
// Get all categories
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.prisma.category.findMany();
    });
}
// Get category by id
function getCategoryById(c_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.prisma.category.findUnique({ where: { c_id } });
    });
}
//Get category by name
function getCategoryByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.prisma.category.findUnique({ where: { name } });
    });
}
// Update category
function updateCategory(c_id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateData = {};
            if (data.name)
                updateData.name = data.name;
            return yield db_1.prisma.category.update({ where: { c_id }, data: updateData });
        }
        catch (error) {
            console.error("Prisma error (updateCategory):", error);
            throw new Error("Failed to update category");
        }
    });
}
// Delete category
function deleteCategory(c_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.prisma.category.delete({ where: { c_id } });
    });
}
