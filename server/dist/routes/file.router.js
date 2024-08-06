"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = void 0;
const file_controller_1 = require("../controllers/file.controller");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const middleware_1 = require("../middlewares/middleware");
// Configure Multer middleware (adjust destination folder as needed)
const filePath = path_1.default.resolve(__dirname, "../uploads");
const upload = (0, multer_1.default)({ dest: filePath });
const fileRouter = express_1.default.Router();
exports.fileRouter = fileRouter;
fileRouter.post("/", middleware_1.authMiddleware, upload.single("file"), file_controller_1.createFileController);
fileRouter.get("/", middleware_1.authMiddleware, file_controller_1.getAllFilesController);
fileRouter.get("/:id", middleware_1.authMiddleware, file_controller_1.getFileController);
fileRouter.put("/:id", middleware_1.authMiddleware, upload.single("file"), file_controller_1.updateFileController);
fileRouter.delete("/:id", middleware_1.authMiddleware, file_controller_1.deleteFileController);
