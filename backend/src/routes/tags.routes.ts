import { Router } from 'express';
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
} from '../controllers';

const router = Router();

router.get('/', getAllTags);
router.get('/:id', getTagById);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
