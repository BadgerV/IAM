"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./auth.router");
const file_router_1 = require("./file.router");
const folder_router_1 = require("./folder.router");
const log_router_1 = require("./log.router");
const permission_router_1 = require("./permission.router");
const accessRequest_router_1 = require("./accessRequest.router");
const apiPath = "/api/v1";
const router = express_1.default.Router();
exports.router = router;
router.use(`${apiPath}/file`, file_router_1.fileRouter);
router.use(`${apiPath}/folder`, folder_router_1.folderRouter);
router.use(`${apiPath}/auth`, auth_router_1.authRouter);
router.use(`${apiPath}/log`, log_router_1.logRouter);
router.use(`${apiPath}/permission`, permission_router_1.permissionRouter);
router.use(`${apiPath}/access/request`, accessRequest_router_1.accessRequestRouter);
router.use('/uploads', express_1.default.static('uploads'));