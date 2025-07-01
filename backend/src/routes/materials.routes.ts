import { Router } from 'express';
import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from '../controllers';

import { validate } from '../middlewares/validate';
import { createMaterialSchema, updateMaterialSchema } from '../schemas/';

const router = Router();

router.get('/', getAllMaterials);
router.get('/:id', getMaterialById);
router.post('/',  validate(createMaterialSchema), createMaterial);
router.patch('/:id',  validate(updateMaterialSchema), updateMaterial);
router.delete('/:id',  deleteMaterial);
router.delete('/:id', deleteMaterial);

export default router;
