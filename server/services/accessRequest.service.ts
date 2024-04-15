import { Pool } from 'pg';
import { AccessRequest } from '../models/AccessRequest';
import pool from '../db/connect';

const createAccessRequest = async (accessRequest: AccessRequest): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO access_request (file_id, status, reason)
      VALUES ($1, $2, $3)
    `;
    const values: any[] = [
      accessRequest.file_id,
      accessRequest.status,
      accessRequest.reason,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getAccessRequestById = async (id: number): Promise<AccessRequest | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM access_request WHERE id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const updateAccessRequest = async (id: number, accessRequest: AccessRequest): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE access_request
      SET file_id = $1, status = $2, reason = $3
      WHERE id = $4
    `;
    const values: any[] = [
      accessRequest.file_id,
      accessRequest.status,
      accessRequest.reason,
      id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deleteAccessRequestById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM access_request WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export { createAccessRequest, getAccessRequestById, updateAccessRequest, deleteAccessRequestById };
