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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolderController = exports.updateFolderController = exports.getFoldersController = exports.getFolderController = exports.createFolderController = void 0;
const folder_service_1 = require("../services/folder.service");
const accessRequest_service_1 = require("../services/accessRequest.service");
const log_service_1 = require("../services/log.service");
const user_service_1 = require("../services/user.service");
const permission_service_1 = require("../services/permission.service");
// Controller function to create a new folder
const createFolderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // Check if name and description are provided
        if (!name || !description) {
            return res
                .status(400)
                .json({ message: "Name and description are required" });
        }
        // Create a new folder object
        const newFolder = {
            id: 1,
            name,
            description,
        };
        const user = (0, user_service_1.getUserById)(Number(req.user_id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const permission = yield (0, permission_service_1.getPermissionByUserId)(Number(req.user_id));
        if ((permission === null || permission === void 0 ? void 0 : permission.is_active) === false) {
            res.status(401).json({ message: "You are not authorized to carry out this transaction" });
            return;
        }
        yield (0, log_service_1.createLog)({
            id: 1,
            user_id: Number(req.user_id),
            action_taken: `Created folder ${name}`,
            file_id: null,
        });
        // Call the service function to create the folder
        yield (0, folder_service_1.createFolder)(newFolder);
        res.status(201).json({ message: "Folder created successfully" });
    }
    catch (error) {
        console.error("Error creating folder:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createFolderController = createFolderController;
// Controller function to get a folder by ID
const getFoldersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the service function to get the folders
        const folders = yield (0, folder_service_1.getFolders)();
        const user_id = Number(req.user_id);
        if (!folders) {
            return res.status(404).json({ message: "Folders not found" });
        }
        // Iterate through each folder
        for (const folder of folders) {
            // Iterate through each file in the folder
            if (folder.files[0] !== null) {
                for (const file of folder.files) {
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
                        // Set can_access for the file
                        file.can_access = can_access;
                    }
                }
            }
        }
        res.status(200).json(folders);
    }
    catch (error) {
        console.error("Error fetching folders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getFoldersController = getFoldersController;
// Controller function to get a folder by ID
const getFolderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderId = parseInt(req.params.id, 10);
        // Call the service function to get the folder by ID
        const folder = yield (0, folder_service_1.getFolderById)(folderId);
        const user_id = Number(req.user_id);
        const user = yield (0, user_service_1.getUserById)(user_id);
        for (const file of folder.files) {
            // Check if access_type is 'org_wide'
            if (file.access_type === "org_wide") {
                // Set can_access to true
                file.can_access = true;
            }
            else {
                const access_request = yield (0, accessRequest_service_1.getAccessRequestByUserFileId)(user_id, file.file_id);
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
        console.log(folder, "folder");
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }
        res.status(200).json(folder);
    }
    catch (error) {
        console.error("Error fetching folder by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getFolderController = getFolderController;
// Controller function to update a folder
const updateFolderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderId = parseInt(req.params.id, 10);
        const { name, description } = req.body;
        // Check if id, name, and description are provided
        if (!name || !description) {
            return res
                .status(400)
                .json({ message: "ID, name, and description are required" });
        }
        // Call the service function to get the folder by ID
        const folder = yield (0, folder_service_1.getFolderById)(folderId);
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }
        // Create a new folder object with updated values
        const updatedFolder = {
            id: folderId,
            name,
            description,
        };
        // Call the service function to update the folder
        yield (0, folder_service_1.updateFolder)(folderId, updatedFolder);
        res.status(200).json({ message: "Folder updated successfully" });
    }
    catch (error) {
        console.error("Error updating folder:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateFolderController = updateFolderController;
// Controller function to delete a folder by ID
const deleteFolderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderId = parseInt(req.params.id, 10);
        // Call the service function to get the folder by ID
        const folder = yield (0, folder_service_1.getFolderById)(folderId);
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }
        // Call the service function to delete the folder by ID
        yield (0, folder_service_1.deleteFolderById)(folderId);
        res.status(200).json({ message: "Folder deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting folder:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteFolderController = deleteFolderController;
