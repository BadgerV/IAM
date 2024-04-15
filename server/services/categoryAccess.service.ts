import { Pool } from 'pg';
import { CategoryAccess } from '../models/CategoryAccess';
import pool from '../db/connect';

const createCategoryAccess = async (categoryAccess: CategoryAccess): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO categories_access (category_id, user_id, can_read, can_write, can_delete)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values: any[] = [
      categoryAccess.category_id,
      categoryAccess.user_id,
      categoryAccess.can_read,
      categoryAccess.can_write,
      categoryAccess.can_delete,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getCategoryAccessById = async (id: number): Promise<CategoryAccess | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM categories_access WHERE id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const getCategoryAccessByCategoryId = async (id: number): Promise<CategoryAccess[] | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM categories_access WHERE category_id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const updateCategoryAccess = async (id: number, categoryAccess: CategoryAccess): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE categories_access
      SET category_id = $1, user_id = $2, can_read = $3, can_write = $4, can_delete = $5
      WHERE id = $6
    `;
    const values: any[] = [
      categoryAccess.category_id,
      categoryAccess.user_id,
      categoryAccess.can_read,
      categoryAccess.can_write,
      categoryAccess.can_delete,
      id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deleteCategoryAccessById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM categories_access WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export { createCategoryAccess, getCategoryAccessById, getCategoryAccessByCategoryId, updateCategoryAccess, deleteCategoryAccessById };
