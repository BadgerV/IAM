"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessRequestRouter = void 0;
const express_1 = __importDefault(require("express"));
const accessRequest_controller_1 = require("../controllers/accessRequest.controller");
const middleware_1 = require("../middlewares/middleware");
const accessRequestRouter = express_1.default.Router();
exports.accessRequestRouter = accessRequestRouter;
// Routes for access requests
accessRequestRouter.post('/', middleware_1.authMiddleware, accessRequest_controller_1.createAccessRequestController);
accessRequestRouter.get('/', middleware_1.authMiddleware, accessRequest_controller_1.getAccessRequestsController);
accessRequestRouter.get('/:id', middleware_1.authMiddleware, accessRequest_controller_1.getAccessRequestByIdController);
accessRequestRouter.get('/user/:id', middleware_1.authMiddleware, accessRequest_controller_1.getAccessRequestByUserIdController);
accessRequestRouter.put('/:id', middleware_1.requireSuperAdmin, accessRequest_controller_1.updateAccessRequestController);
accessRequestRouter.delete('/:id', middleware_1.requireSuperAdmin, accessRequest_controller_1.deleteAccessRequestByIdController);
