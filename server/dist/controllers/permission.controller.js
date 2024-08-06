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
exports.updatePermissionController = exports.deletePermissionController = exports.getPermissionController = exports.createPermissionController = void 0;
const permission_service_1 = require("../services/permission.service");
// Controller function to create file access
const createPermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, can_read, can_write, can_delete, role } = req.body;
        // Check if required fields are provided
        if (!user_id ||
            typeof can_read !== "boolean" ||
            typeof can_write !== "boolean" ||
            typeof can_delete !== "boolean" ||
            !role) {
            return res.status(400).json({
                message: "user ID, can_read, can_write, and can_delete are required",
            });
        }
        // Create file access object
        const newPermission = {
            user_id,
            can_read,
            can_write,
            can_delete,
            is_active: true,
            role,
        };
        // Call the service function to create file access
        yield (0, permission_service_1.createPermission)(newPermission);
        res.status(201).json({ message: "File access created successfully" });
    }
    catch (error) {
        console.error("Error creating file access:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createPermissionController = createPermissionController;
// Controller function to get file access by ID
const getPermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.params.id, 10);
        // Call the service function to get file access by ID
        const permission = yield (0, permission_service_1.getPermissionByUserId)(user_id);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }
        res.status(200).json(permission);
    }
    catch (error) {
        console.error("Error fetching file access by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPermissionController = getPermissionController;
// Controller function to update file access
const updatePermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.params.id, 10);
        const { can_read, can_write, can_delete, is_active, role } = req.body;
        console.log(typeof is_active);
        // Check if required fields are provided
        if (!user_id ||
            typeof can_read !== "boolean" ||
            typeof can_write !== "boolean" ||
            typeof can_delete !== "boolean") {
            return res.status(400).json({
                message: "user ID, can_read, can_write, and can_delete are required",
            });
        }
        // Create file access object
        const updatedPermission = {
            user_id,
            can_read,
            can_write,
            can_delete,
            is_active,
            role,
        };
        // Call the service function to update file access
        yield (0, permission_service_1.updatePermission)(user_id, updatedPermission);
        res.status(200).json({ message: "File access updated successfully" });
    }
    catch (error) {
        console.error("Error updating file access:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updatePermissionController = updatePermissionController;
// Controller function to delete file access by ID
const deletePermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.params.id, 10);
        // Call the service function to delete file access by ID
        yield (0, permission_service_1.deletePermissionById)(user_id);
        res.status(200).json({ message: "File access deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting file access:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePermissionController = deletePermissionController;
