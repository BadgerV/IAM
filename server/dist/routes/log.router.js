"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRouter = void 0;
const express_1 = __importDefault(require("express"));
const log_controller_1 = require("../controllers/log.controller");
const logRouter = express_1.default.Router();
exports.logRouter = logRouter;
logRouter.get('/', log_controller_1.getLogsController);
logRouter.get('/user/:id', log_controller_1.getUserLogController);
logRouter.get('/file/:id', log_controller_1.getFileLogController);
