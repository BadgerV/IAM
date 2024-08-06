"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionRouter = void 0;
const permission_controller_1 = require("../controllers/permission.controller");
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middlewares/middleware");
const permissionRouter = express_1.default.Router();
exports.permissionRouter = permissionRouter;
permissionRouter.post("/", middleware_1.requireSuperAdmin, permission_controller_1.createPermissionController);
permissionRouter.put("/:id", middleware_1.requireSuperAdmin, permission_controller_1.updatePermissionController);
permissionRouter.delete("/:id", middleware_1.requireSuperAdmin, permission_controller_1.deletePermissionController);
permissionRouter.get("/:id", middleware_1.requireSuperAdmin, permission_controller_1.getPermissionController);
