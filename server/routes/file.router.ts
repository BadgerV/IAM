import {
 createFileController, getAllFilesController, getFileController, updateFileController, deleteFileController
} from "../controllers/file.controller";
import express from "express";
import multer from "multer";
import path from "path";
import { authMiddleware, requireSuperAdmin } from "../middlewares/middleware";
import {
  createFileAccessController,
  getFileAccessByIdController,
  getFileAccessByFileIdController,
  updateFileAccessController,
  deleteFileAccessByIdController,
} from "../controllers/fileAccess.controller";

// Configure Multer middleware (adjust destination folder as needed)
const filePath = path.resolve(__dirname, "../uploads");
const upload = multer({ dest: filePath });

const fileRouter = express.Router();

fileRouter.post(
  "/",
  authMiddleware,
  upload.single("file"),
  createFileController
);
fileRouter.get("/", authMiddleware, getAllFilesController);
fileRouter.get("/:id", authMiddleware, getFileController);
fileRouter.put("/:id", authMiddleware,  upload.single("file"), updateFileController);
fileRouter.delete("/:id", authMiddleware, deleteFileController);

fileRouter.post("access/", authMiddleware, createFileAccessController);
fileRouter.get("access/:id", authMiddleware, getFileAccessByIdController);
fileRouter.get("access/file/:id", authMiddleware, getFileAccessByFileIdController);
fileRouter.put("access/:id", authMiddleware, updateFileAccessController);
fileRouter.delete("access/:id", authMiddleware, deleteFileAccessByIdController);

export { fileRouter }