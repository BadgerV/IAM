// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Permission } from "../models/Permission";
import { createUser, getUserByEmail, getUsers } from "../services/user.service";
import { createPermission } from "../services/permission.service";
import { defaultConfig } from "../config/config";
import { createLog } from "../services/log.service";

const saltRounds = 10;
const secretKey = defaultConfig.SECRET_KEY;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role, is_active, is_admin } = req.body;
    if (!username || !email || !password || !role) {
      res
        .status(400)
        .json({ message: "username, email, password, role are required" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser: User = {
      id: 1, // Generate unique ID
      username,
      email,
      password: hashedPassword,
      role,
      is_active,
      is_admin,
    };
    await createUser(newUser);

    const user = await getUserByEmail(email);
    const newPermission: Permission = {
      user_id: Number(user?.id),
      can_read: false,
      can_write: false,
      can_delete: false,
    };
    await createPermission(newPermission);

    await createLog({
      id: 1,
      user_id: Number(req.user_id),
      action_taken: `Created User ${username}`,
      file_id: null,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    const role = user?.role;
    const is_active = user?.is_active;
    // const can_read = user?.can_read;
    // const can_write = user?.can_write;
    // const can_delete = user?.can_delete;

    const username = user?.username;
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, secretKey);

    await createLog({
      id: 1,
      user_id: Number(user.id),
      action_taken: "Logged In",
      file_id: null,
    });

    res.json({
      username,
      token,
      role,
      is_active,
      // can_read,
      // can_write,
      // can_delete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to get a folder by ID
export const getUsersController = async (req: Request, res: Response) => {
  try {
    // Call the service function to get the folder by ID
    const folders = await getUsers();

    if (!folders) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware for authenticating JWT token
// export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
export function authenticateToken(
  req: any,
  res: Response,
  next: NextFunction
): void {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  // Verify and decode the token
  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    // Add the decoded user information to the request object
    req.user = decoded;
    next();
  });
}
