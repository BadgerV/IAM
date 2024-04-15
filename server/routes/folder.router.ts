import express from "express";

import {
  createFolderController, 
  getFoldersController, 
  updateFolderController, 
  getFolderController, 
  deleteFolderController,
} from "../controllers/folder.controller";

import {
  createFolderAccessController,
  getFolderAccessByIdController,
  getFolderAccessByFolderIdController,
  updateFolderAccessController,
  deleteFolderAccessByIdController,
} from "../controllers/folderAccess.controller";

import { requireSuperAdmin } from "../middlewares/middleware";

const folderRouter = express.Router();

// Routes for folders
folderRouter.post('/', requireSuperAdmin, createFolderController);
folderRouter.get('/', getFoldersController);
folderRouter.get('/:id', getFolderController);
folderRouter.put('/:id', requireSuperAdmin, updateFolderController);
folderRouter.delete('/:id', requireSuperAdmin, deleteFolderController);

// Routes for folder access
folderRouter.post('/access', requireSuperAdmin, createFolderAccessController);
folderRouter.get('/access/:id', getFolderAccessByIdController);
folderRouter.get('/access/folder/:folderId', getFolderAccessByFolderIdController);
folderRouter.put('/access/:id', requireSuperAdmin, updateFolderAccessController);
folderRouter.delete('/access/:id', requireSuperAdmin, deleteFolderAccessByIdController);

export { folderRouter };
