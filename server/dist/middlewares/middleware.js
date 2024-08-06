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
exports.requireSuperAdmin = exports.requireAdminOrManager = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const user_service_1 = require("../services/user.service");
// Middleware for extracting user ID from JWT token
const authMiddleware = (req, res, next) => {
    // Get the JWT token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    // Verify and decode the JWT token
    jsonwebtoken_1.default.verify(token, config_1.defaultConfig.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        // Add the decoded user information to the request object
        req.user_id = decoded.userId; // Assuming userId is stored in the JWT payload
        next();
    });
};
exports.authMiddleware = authMiddleware;
const requireAdminOrManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the JWT token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    // Verify and decode the JWT token
    jsonwebtoken_1.default.verify(token, config_1.defaultConfig.SECRET_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        const user = yield (0, user_service_1.getUserById)(decoded.userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if user is a super admin
        if (user.role !== "super_admin" && user.role !== "manager") {
            return res
                .status(403)
                .json({ error: "Unauthorized - Admin or manager required" });
        }
        // Add the decoded user information to the request object
        req.user_id = decoded.userId; // Assuming user id is stored in the database
        next();
    }));
});
exports.requireAdminOrManager = requireAdminOrManager;
const requireSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the JWT token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    // Verify and decode the JWT token
    jsonwebtoken_1.default.verify(token, config_1.defaultConfig.SECRET_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        const user = yield (0, user_service_1.getUserById)(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if user is a super admin
        if (!user.is_admin) {
            return res
                .status(403)
                .json({ error: "Unauthorized - Super admin access required" });
        }
        // Add the decoded user information to the request object
        req.user_id = decoded.userId; // Assuming user id is stored in the database
        next();
    }));
});
exports.requireSuperAdmin = requireSuperAdmin;
