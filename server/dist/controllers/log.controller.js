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
exports.getUserLogController = exports.getFileLogController = exports.getLogsController = void 0;
const log_service_1 = require("../services/log.service");
// Controller function to get a category by ID
const getLogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the service function to get the category by ID
        const logs = yield (0, log_service_1.getAllLogs)();
        if (!logs) {
            return res.status(404).json({ message: 'Categories not found' });
        }
        res.status(200).json(logs);
    }
    catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getLogsController = getLogsController;
// Controller function to get a log by user ID
const getUserLogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logId = parseInt(req.params.id, 10);
        // Call the service function to get the log by user ID
        const logs = yield (0, log_service_1.getLogsByUserId)(logId);
        if (!logs) {
            return res.status(404).json({ message: 'Logs not found' });
        }
        res.status(200).json(logs);
    }
    catch (error) {
        console.error('Error fetching logs', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserLogController = getUserLogController;
// Controller function to get a log by fileID
const getFileLogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logId = parseInt(req.params.id, 10);
        // Call the service function to get the log by File ID
        const logs = yield (0, log_service_1.getLogsByFileId)(logId);
        if (!logs) {
            return res.status(404).json({ message: 'Logs not found' });
        }
        res.status(200).json(logs);
    }
    catch (error) {
        console.error('Error fetching logs', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getFileLogController = getFileLogController;
