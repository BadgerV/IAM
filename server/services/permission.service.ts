import { Pool } from 'pg';
import { Permission } from '../models/Permission';
import pool from '../db/connect';

const createPermission = async (permission: Permission): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO permissions ( user_id, can_read, can_write, can_delete)
      VALUES ($1, $2, $3, $4)
    `;
    const values: any[] = [
      permission.user_id,
      permission.can_read,
      permission.can_write,
      permission.can_delete,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getPermissionByUserId = async (user_id: number): Promise<Permission | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM permissions WHERE user_id = $1';
    const { rows } = await client.query(query, [user_id]);
    return rows[0];
  } finally {
    client.release();
  }
};




const updatePermission = async (id: number, permission: Permission): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE permissions
      SET can_read = $1, can_write = $2, can_delete = $3
      WHERE user_id = $4
    `;
    const values: any[] = [
   
      permission.can_read,
      permission.can_write,
      permission.can_delete,
      permission.user_id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deletePermissionById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM permissions WHERE user_id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export { createPermission, getPermissionByUserId, updatePermission, deletePermissionById };
