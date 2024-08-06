"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const middleware_1 = require("../middlewares/middleware");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/signin", auth_controller_1.login);
authRouter.post("/verify", auth_controller_1.verifyEmail);
authRouter.get("/users", auth_controller_1.getUsersController);
authRouter.get("/user/:userId", auth_controller_1.getUserController);
authRouter.post("/register", middleware_1.requireSuperAdmin, auth_controller_1.register);
