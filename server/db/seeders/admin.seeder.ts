import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { User } from "../../models/User";
import {createUser} from "../../services/user.service";
import { defaultConfig } from "../../config/config";

const saltRounds = 10;
const secretKey = defaultConfig.SECRET_KEY;

export const createAdmin = async (): Promise<void> => {
  try {
    
// Provided object
const userInfo = {
    username: "admin",
    email: "admin@accessshield.com",
    password: defaultConfig.ADMIN_PASSWORD,
    role: "super_admin",
    is_active: true,
    is_admin: true
  };
  
  // Destructuring assignment
  const { username, email, password, role, is_active, is_admin } = userInfo;
  
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
   console.log({ message: "Admin User Seeded successfully" });
  } catch (error) {
    console.error(error);
    console.log({ message: "Internal Server Error" });
  }
};