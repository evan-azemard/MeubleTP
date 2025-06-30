import { Router } from 'express';
import { getFurnitureStats, getMaterialStats } from '../controllers';

const router = Router();

router.get('/furnitures', getFurnitureStats);
router.get('/materials', getMaterialStats);

export default router;
