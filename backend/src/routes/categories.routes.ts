import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers';

import { validate } from '../middlewares/validate';
import { createCategorySchema, updateCategorySchema } from '../schemas/';


const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

router.post('/', validate(createCategorySchema), createCategory);
router.put('/:id', validate(updateCategorySchema), updateCategory);
router.delete('/:id', deleteCategory);

export default router;
