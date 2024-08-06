"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileController = exports.updateFileController = exports.getFileController = exports.getAllFilesController = exports.createFileController = void 0;
const cloud_1 = require("./cloud/cloud");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file_service_1 = require("../services/file.service");
const log_service_1 = require("../services/log.service");
const accessRequest_service_1 = require("../services/accessRequest.service");
const user_service_1 = require("../services/user.service");
// Controller function to create a new file
const createFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file_name, file_size, folder_id, permission_type, description } = req.body;
        const file = req.file;
        const user_id = req.user_id;
        if (!file || !file_name || !file_size) {
            return res
                .status(400)
                .json({ message: "File, file_name, file_size are required" });
        }
        if (!permission_type) {
            return res.status(400).json({ message: "permission_type is required" });
        }
        if (permission_type !== "org_wide" && permission_type !== "request_only") {
            return res
                .status(400)
                .json({ message: "permission_type must be org_wide or request_only" });
        }
        let cloudUrl = "";
        const firebaseUrl = yield (0, cloud_1.uploadToFirebase)(file.path, file_name);
        cloudUrl = firebaseUrl;
        const newFile = {
            id: 1,
            user_id: Number(user_id),
            folder_id: folder_id,
            file_name: file_name,
            file_size: file_size,
            access_type: permission_type,
            description: description,
            cloud_url: cloudUrl,
        };
        yield (0, file_service_1.createFile)(newFile);
        yield (0, log_service_1.createLog)({
            id: 1,
            user_id: Number(user_id),
            action_taken: `Created File ${file_name}`,
            file_id: null,
        });
        // Clean up the local file
        fs_1.default.unlinkSync(file.path);
        res
            .status(200)
            .json({ message: "File created Successfully", file_name, cloudUrl });
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(400).json({ message: "Error uploading file" });
    }
});
exports.createFileController = createFileController;
// Controller function to get all files
const getAllFilesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = Number(req.user_id);
        const files = yield (0, file_service_1.getAllFiles)();
        const user = yield (0, user_service_1.getUserById)(user_id);
        for (const file of files) {
            // Check if access_type is 'org_wide'
            if (file.access_type === "org_wide") {
                // Set can_access to true
                file.can_access = true;
            }
            else {
                const access_request = yield (0, accessRequest_service_1.getAccessRequestByUserFileId)(user_id, file.id);
                let can_access = false;
                // Check if access request exists and if it's approved
                if (access_request && access_request.status === true) {
                    can_access = true;
                }
                if (user === null || user === void 0 ? void 0 : user.is_admin) {
                    can_access = true;
                }
                // Set can_access for the file
                file.can_access = can_access;
            }
        }
        res.status(200).json(files);
    }
    catch (error) {
        console.error("Error fetching all files:", error);
        res.status(500).send("Internal server error");
    }
});
exports.getAllFilesController = getAllFilesController;
// Controller function to get a file by ID
const getFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user_id = req.user_id;
        // Check if fileId is provided
        if (!id) {
            return res.status(400).json({ message: "File ID is required" });
        }
        const file = yield (0, file_service_1.getFileById)(Number(id));
        // Check if file exists
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        // Fetch the file from Firebase Storage
        const filePath = yield (0, cloud_1.fetchFileFromFirebase)(file.file_name);
        const serverFilePath = `http://localhost:8000/uploads/${path_1.default.basename(filePath)}`;
        yield (0, log_service_1.createLog)({
            id: 1,
            user_id: Number(user_id),
            action_taken: `Downloaded File ${file.file_name}`,
            file_id: null,
        });
        res.json({ file, filePath: serverFilePath });
    }
    catch (error) {
        console.error("Error fetching file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getFileController = getFileController;
// Controller function to update a file
const updateFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            const firebaseUrl = yield (0, cloud_1.uploadToFirebase)(req.file.path, req.body.file_name);
            req.body.cloud_url = firebaseUrl;
        }
        const fileId = parseInt(req.params.id, 10);
        const updatedFile = req.body;
        yield (0, file_service_1.updateFile)(fileId, updatedFile);
        res.status(200).json({ message: "File updated successfully" });
    }
    catch (error) {
        console.error("Error updating file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateFileController = updateFileController;
// Controller function to delete a file by ID
const deleteFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = parseInt(req.params.id, 10);
        const file = yield (0, file_service_1.getFileById)(Number(fileId));
        yield (0, file_service_1.deleteFileById)(fileId);
        yield (0, log_service_1.createLog)({
            id: 1,
            user_id: Number(req.user_id),
            action_taken: `Deleted File ${file === null || file === void 0 ? void 0 : file.file_name}`,
            file_id: null,
        });
        res.status(200).json({ message: "File deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteFileController = deleteFileController;
