// services/CategoryService.ts
import { Request, Response } from 'express';
import { Category } from '../models/Category';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} from '../services/category.service';



// Controller function to create a new category
const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Check if name and description are provided
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    // Create a new category object
    const newCategory: Category = {
      id:1,
      name,
      description,
    };

    // Call the service function to create the category
    await createCategory(newCategory);

    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a category by ID
const getCategoriesController = async (req: Request, res: Response) => {
    try {
      // Call the service function to get the category by ID
      const categories = await getCategories();
  
      if (!categories) {
        return res.status(404).json({ message: 'Categories not found' });
      }
  
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Controller function to get a category by ID
const getCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId: number = parseInt(req.params.id, 10);

    // Call the service function to get the category by ID
    const category = await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a category
const updateCategoryController = async (req: Request, res: Response)=> {
    try {
      const categoryId: number = parseInt(req.params.id, 10);
      const {  name, description } = req.body;
  
      // Check if id, name, and description are provided
      if ( !name || !description) {
        return res.status(400).json({ message: 'ID, name, and description are required' });
      }

       // Call the service function to get the category by ID
    const category = await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
  
      // Create a new category object with updated values
      const updatedCategory: Category = {
        id:categoryId,
        name,
        description,
      };
  
      // Call the service function to update the category
      await updateCategory(categoryId, updatedCategory);
  
      res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Controller function to delete a category by ID
const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId: number = parseInt(req.params.id, 10);


     // Call the service function to get the category by ID
     const category = await getCategoryById(categoryId);

     if (!category) {
       return res.status(404).json({ message: 'Category not found' });
     }

    // Call the service function to delete the category by ID
    await deleteCategoryById(categoryId);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createCategoryController, getCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController };
