import express from "express";

import { login, register } from "../controllers/auth.controller";

import { requireSuperAdmin } from "../middlewares/middleware";

const authRouter = express.Router();

authRouter.post("/signin", login);
authRouter.post("/register", requireSuperAdmin, register);

export { authRouter };
