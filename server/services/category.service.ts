import { Pool } from 'pg';
import { Category } from '../models/Category';
import pool from '../db/connect';

const createCategory = async (category: Category): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO categories (name, description)
      VALUES ($1, $2)
    `;
    const values: any[] = [
      category.name,
      category.description,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getCategories = async (): Promise<Category[]> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM categories';
    const { rows } = await client.query(query);
    return rows;
  } finally {
    client.release();
  }
};

const getCategoryById = async (id: number): Promise<Category | undefined> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const updateCategory = async (id: number, category: Category): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE categories
      SET name = $1, description = $2
      WHERE id = $3
    `;
    const values: any[] = [
      category.name,
      category.description,
      id,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const deleteCategoryById = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM categories WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategoryById };
