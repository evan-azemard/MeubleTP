import { Router } from 'express';
import {
  getAllFurnitures,
  getFurnitureById,
  createFurniture,
  updateFurniture,
  deleteFurniture
} from '../controllers';
import { validate } from '../middlewares/validate';
import { createFurnitureSchema, updateFurnitureSchema } from '../schemas';

const router = Router();

router.get('/', getAllFurnitures);
router.get('/:id', getFurnitureById);

router.post('/', validate(createFurnitureSchema), createFurniture);
router.patch('/:id', validate(updateFurnitureSchema), updateFurniture);
router.delete('/:id', deleteFurniture);

export default router;
