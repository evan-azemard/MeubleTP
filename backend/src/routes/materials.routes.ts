import { Router } from 'express';
import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from '../controllers';

const router = Router();

router.get('/', getAllMaterials);
router.get('/:id', getMaterialById);
router.post('/', createMaterial);
router.patch('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;
