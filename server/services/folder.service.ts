import { Pool } from 'pg';
import { Folder } from '../models/Folder';
import pool from '../db/connect';

const createFolder = async (folder: Folder): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO folders (name, description)
      VALUES ($1, $2)
    `;
    const values: any[] = [
      folder.name,
      folder.description,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getFolderById = async (id: number): Promise<Folder | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM folders WHERE id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const getFolders = async (): Promise<Folder[] | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM folders';
    const { rows } = await client.query(query);
    return rows;
  } finally {
    client.release();
  }
};

const updateFolder = async (id: number, folder: Folder): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE folders
      SET name = $1, description = $2
      WHERE id = $3
    `;
    const values: any[] = [
      folder.name,
      folder.description,
      id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deleteFolderById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM folders WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export { createFolder, getFolderById, getFolders, updateFolder, deleteFolderById };
