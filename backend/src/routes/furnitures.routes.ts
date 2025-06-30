import { Router } from 'express';
import {
  getAllFurnitures,
  getFurnitureById,
  createFurniture,
  updateFurniture,
  deleteFurniture
} from '../controllers';

const router = Router();

router.get('/', getAllFurnitures);
router.get('/:id', getFurnitureById);
router.post('/', createFurniture);
router.patch('/:id', updateFurniture);
router.delete('/:id', deleteFurniture);

export default router;
