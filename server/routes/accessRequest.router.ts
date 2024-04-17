import express from 'express';
import {
  createAccessRequestController,
  getAccessRequestByIdController,
  getAccessRequestsController,
  updateAccessRequestController,
  deleteAccessRequestByIdController,
} from '../controllers/accessRequest.controller';
import { requireSuperAdmin, authMiddleware } from '../middlewares/middleware';

const accessRequestRouter = express.Router();

// Routes for access requests
accessRequestRouter.post('/', authMiddleware, createAccessRequestController);
accessRequestRouter.get('/', getAccessRequestsController);
accessRequestRouter.get('/:id', authMiddleware, getAccessRequestByIdController);
accessRequestRouter.put('/:id', requireSuperAdmin, updateAccessRequestController);
accessRequestRouter.delete('/:id', requireSuperAdmin, deleteAccessRequestByIdController);

export { accessRequestRouter };
