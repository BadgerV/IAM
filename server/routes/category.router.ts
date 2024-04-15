import express from "express";

import {
  createCategoryController, 
  getCategoriesController, 
  updateCategoryController, 
  getCategoryController, 
  deleteCategoryController,
} from "../controllers/category.controller";

import {
  createCategoryAccessController,
  getCategoryAccessByIdController,
  getCategoryAccessByCategoryIdController,
  updateCategoryAccessController,
  deleteCategoryAccessByIdController,
} from "../controllers/categoryAccess.controller";

import { requireSuperAdmin } from "../middlewares/middleware";

const categoryRouter = express.Router();

// Routes for categories
categoryRouter.post('/', requireSuperAdmin, createCategoryController);
categoryRouter.get('/', getCategoriesController);
categoryRouter.get('/:id', getCategoryController);
categoryRouter.put('/:id', requireSuperAdmin, updateCategoryController);
categoryRouter.delete('/:id', requireSuperAdmin, deleteCategoryController);

// Routes for category access
categoryRouter.post('access/:categoryId', requireSuperAdmin, createCategoryAccessController);
categoryRouter.get('/access/:id', getCategoryAccessByIdController);
categoryRouter.get('/access/:categoryId', getCategoryAccessByCategoryIdController);
categoryRouter.put('/access/:id', requireSuperAdmin, updateCategoryAccessController);
categoryRouter.delete('/access/:id', requireSuperAdmin, deleteCategoryAccessByIdController);

export { categoryRouter };
