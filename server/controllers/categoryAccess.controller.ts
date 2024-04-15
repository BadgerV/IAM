import { Request, Response } from 'express';
import { CategoryAccess } from '../models/CategoryAccess';
import {
  createCategoryAccess,
  getCategoryAccessById,
  getCategoryAccessByCategoryId,
  updateCategoryAccess,
  deleteCategoryAccessById,
} from '../services/categoryAccess.service';

// Controller function to create a new category access
const createCategoryAccessController = async (req: Request, res: Response) => {
  try {
    const { category_id, user_id, can_read, can_write, can_delete } = req.body;

    // Check if all required fields are provided
    if (!category_id || !user_id || can_read === undefined || can_write === undefined || can_delete === undefined) {
      return res.status(400).json({ message: 'category_id, user_id, can_read, can_write, and can_delete are required' });
    }

    // Create a new category access object
    const newCategoryAccess: CategoryAccess = {
      id: 1, // Assuming you handle IDs in the service
      category_id,
      user_id,
      can_read,
      can_write,
      can_delete,
    };

    // Call the service function to create the category access
    await createCategoryAccess(newCategoryAccess);

    res.status(201).json({ message: 'Category access created successfully' });
  } catch (error) {
    console.error('Error creating category access:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get category access by ID
const getCategoryAccessByIdController = async (req: Request, res: Response) => {
  try {
    const categoryAccessId: number = parseInt(req.params.id, 10);

    // Call the service function to get the category access by ID
    const categoryAccess = await getCategoryAccessById(categoryAccessId);

    if (!categoryAccess) {
      return res.status(404).json({ message: 'Category access not found' });
    }

    res.status(200).json(categoryAccess);
  } catch (error) {
    console.error('Error fetching category access by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update category access
const updateCategoryAccessController = async (req: Request, res: Response) => {
  try {
    const categoryAccessId: number = parseInt(req.params.id, 10);
    const { category_id, user_id, can_read, can_write, can_delete } = req.body;

    // Check if all required fields are provided
    if (!category_id || !user_id || can_read === undefined || can_write === undefined || can_delete === undefined) {
      return res.status(400).json({ message: 'category_id, user_id, can_read, can_write, and can_delete are required' });
    }

    // Create a new category access object with updated values
    const updatedCategoryAccess: CategoryAccess = {
      id: categoryAccessId, // Assuming you handle IDs in the service
      category_id,
      user_id,
      can_read,
      can_write,
      can_delete,
    };

    // Call the service function to update the category access
    await updateCategoryAccess(categoryAccessId, updatedCategoryAccess);

    res.status(200).json({ message: 'Category access updated successfully' });
  } catch (error) {
    console.error('Error updating category access:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete category access by ID
const deleteCategoryAccessByIdController = async (req: Request, res: Response) => {
  try {
    const categoryAccessId: number = parseInt(req.params.id, 10);

    // Call the service function to delete the category access by ID
    await deleteCategoryAccessById(categoryAccessId);

    res.status(200).json({ message: 'Category access deleted successfully' });
  } catch (error) {
    console.error('Error deleting category access:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get category access by category ID
const getCategoryAccessByCategoryIdController = async (req: Request, res: Response) => {
    try {
      const categoryId: number = parseInt(req.params.id, 10);
  
      // Call the service function to get the category access by category ID
      const categoryAccess = await getCategoryAccessByCategoryId(categoryId);
  
      if (!categoryAccess) {
        return res.status(404).json({ message: 'Category access not found for the specified category ID' });
      }
  
      res.status(200).json(categoryAccess);
    } catch (error) {
      console.error('Error fetching category access by category ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

export {
  createCategoryAccessController,
  getCategoryAccessByIdController,
  getCategoryAccessByCategoryIdController,
  updateCategoryAccessController,
  deleteCategoryAccessByIdController,
};
