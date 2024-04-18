// services/UserService.ts
import { Pool } from "pg";
import { User } from "../models/User";
import pool from "../db/connect";

const createUser = async (user: User): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO users (username, email, password, is_admin)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [user.username, user.email, user.password, user.is_admin];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await client.query(query, [email]);
    return rows[0];
  } finally {
    client.release();
  }
};

const getUserById = async (id: number): Promise<User | undefined> => {
  const client = await pool.connect();
  try {
    // Updated query to join the users table with the permissions table
    const query = `
      SELECT users.*, permissions.role 
      FROM users 
      LEFT JOIN permissions ON users.id = permissions.user_id 
      WHERE users.id = $1;
    `;
    const { rows } = await client.query(query, [id]);
    return rows[0]; // Assuming there's only one user with a unique id
  } finally {
    client.release();
  }
};

const getUsers = async (): Promise<User[] | undefined> => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT 
        users.id,
        users.username,
        users.email,
        users.is_admin,
        permissions.* 
      FROM 
        users
      LEFT JOIN 
        permissions ON users.id = permissions.user_id;
    `;
    const { rows } = await client.query(query);
    console.log(rows);
    return rows;
  } finally {
    client.release();
  }
};

export { createUser, getUserByEmail, getUsers, getUserById };
