import express from 'express';
import {
  createAccessRequestController,
  getAccessRequestByIdController,
  updateAccessRequestController,
  deleteAccessRequestByIdController,
} from '../controllers/accessRequest.controller';
import { requireSuperAdmin } from '../middlewares/middleware';

const accessRequestRouter = express.Router();

// Routes for access requests
accessRequestRouter.post('/', requireSuperAdmin, createAccessRequestController);
accessRequestRouter.get('/:id', getAccessRequestByIdController);
accessRequestRouter.put('/:id', requireSuperAdmin, updateAccessRequestController);
accessRequestRouter.delete('/:id', requireSuperAdmin, deleteAccessRequestByIdController);

export { accessRequestRouter };
