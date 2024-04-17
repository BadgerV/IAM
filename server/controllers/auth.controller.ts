// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { User } from "../models/User";
import {createUser, getUserByEmail} from "../services/user.service";
import { defaultConfig } from "../config/config";
import {createLog} from "../services/log.service"


const saltRounds = 10;
const secretKey = defaultConfig.SECRET_KEY;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role, is_active, is_admin} = req.body;
    if(!username||!email||!password||!role){
      res.status(400).json({ message: "username, email, password, role are required" });
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

    await createLog({
      id:1,
      user_id: Number(req.user_id),
      action_taken:"Created User",
      file_id: null
    })

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
      id:1,
      user_id: Number(user.id),
      action_taken:"Logged In",
      file_id: null
    })

    res.json({ username, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
