import { Pool } from 'pg';
import { FolderAccess } from '../models/FolderAccess';
import pool from '../db/connect';

const createFolderAccess = async (folderAccess: FolderAccess): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO folders_access (folder_id, user_id, can_read, can_write, can_delete)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values: any[] = [
      folderAccess.folder_id,
      folderAccess.user_id,
      folderAccess.can_read,
      folderAccess.can_write,
      folderAccess.can_delete,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getFolderAccessById = async (id: number): Promise<FolderAccess | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM folders_access WHERE id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const getFolderAccessByFolderId = async (id: number): Promise<FolderAccess[] | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM folders_access WHERE folder_id = $1';
    const { rows } = await client.query(query, [id]);
    return rows;
  } finally {
    client.release();
  }
};

const updateFolderAccess = async (id: number, folderAccess: FolderAccess): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE folders_access
      SET folder_id = $1, user_id = $2, can_read = $3, can_write = $4, can_delete = $5
      WHERE id = $6
    `;
    const values: any[] = [
      folderAccess.folder_id,
      folderAccess.user_id,
      folderAccess.can_read,
      folderAccess.can_write,
      folderAccess.can_delete,
      id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deleteFolderAccessById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM folders_access WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export { createFolderAccess, getFolderAccessById, getFolderAccessByFolderId, updateFolderAccess, deleteFolderAccessById };
