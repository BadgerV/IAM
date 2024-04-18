import express from "express";

import {
  createFolderController, 
  getFoldersController, 
  updateFolderController, 
  getFolderController, 
  deleteFolderController,
} from "../controllers/folder.controller";



import { authMiddleware, requireSuperAdmin } from "../middlewares/middleware";

const folderRouter = express.Router();

// Routes for folders
folderRouter.post('/', requireSuperAdmin, createFolderController);
folderRouter.get('/', authMiddleware, getFoldersController);
folderRouter.get('/:id', getFolderController);
folderRouter.put('/:id', requireSuperAdmin, updateFolderController);
folderRouter.delete('/:id', requireSuperAdmin, deleteFolderController);


export { folderRouter };
