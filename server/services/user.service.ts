// services/UserService.ts
import { Pool } from 'pg';
import { User } from '../models/User';
import pool from '../db/connect';

const createUser = async (user: User): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO users (username, email, password, role, is_active, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      user.username,
      user.email,
      user.password,
      user.role,
      user.is_active,
      user.is_admin,
    ];
     await client.query(query, values);
  } finally {
    client.release();
  }
};


const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await client.query(query, [email]);
    return rows[0];
  } finally {
    client.release();
  }
};

const getUserById = async (id:number): Promise<User | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};


export { createUser, getUserByEmail, getUserById};
