"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderRouter = void 0;
const express_1 = __importDefault(require("express"));
const folder_controller_1 = require("../controllers/folder.controller");
const middleware_1 = require("../middlewares/middleware");
const folderRouter = express_1.default.Router();
exports.folderRouter = folderRouter;
// Routes for folders
folderRouter.post("/", middleware_1.requireAdminOrManager, folder_controller_1.createFolderController);
folderRouter.get("/", middleware_1.authMiddleware, folder_controller_1.getFoldersController);
folderRouter.get("/:id", middleware_1.authMiddleware, folder_controller_1.getFolderController);
folderRouter.put("/:id", middleware_1.requireSuperAdmin, folder_controller_1.updateFolderController);
folderRouter.delete("/:id", middleware_1.requireSuperAdmin, folder_controller_1.deleteFolderController);
