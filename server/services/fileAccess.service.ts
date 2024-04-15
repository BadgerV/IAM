import { Pool } from 'pg';
import { FileAccess } from '../models/FileAccess';
import pool from '../db/connect';

const createFileAccess = async (fileAccess: FileAccess): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO files_access (file_id, user_id, can_read, can_write, can_delete)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values: any[] = [
      fileAccess.file_id,
      fileAccess.user_id,
      fileAccess.can_read,
      fileAccess.can_write,
      fileAccess.can_delete,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getFileAccessById = async (id: number): Promise<FileAccess | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM files_access WHERE id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const getFileAccessByFileId = async (id: number): Promise<FileAccess | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM files_access WHERE file_id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};


const updateFileAccess = async (id: number, fileAccess: FileAccess): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE files_access
      SET file_id = $1, user_id = $2, can_read = $3, can_write = $4, can_delete = $5
      WHERE id = $6
    `;
    const values: any[] = [
      fileAccess.file_id,
      fileAccess.user_id,
      fileAccess.can_read,
      fileAccess.can_write,
      fileAccess.can_delete,
      id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deleteFileAccessById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM files_access WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export { createFileAccess, getFileAccessById, getFileAccessByFileId, updateFileAccess, deleteFileAccessById };
