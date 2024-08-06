"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = require("./routes/router");
const config_1 = require("./config/config");
exports.app = (0, express_1.default)();
exports.app.set("trust proxy", true);
// Middleware to log HTTP requests
exports.app.use((0, morgan_1.default)("combined"));
// Middleware to parse JSON bodies
exports.app.use(express_1.default.json());
// Middleware to parse URL-encoded bodies
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Middleware to enable CORS
exports.app.use((0, cors_1.default)(config_1.corsSettings));
// Your routes
exports.app.use("/", router_1.router);
exports.default = exports.app;
