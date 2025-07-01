import { Router } from 'express';
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
} from '../controllers';
import { validate } from '../middlewares/validate';
import { createTagSchema, updateTagSchema } from '../schemas';
const router = Router();

router.get('/', getAllTags);
router.get('/:id', getTagById);


router.post('/', validate(createTagSchema), createTag);
router.put('/:id', validate(updateTagSchema), updateTag);
router.delete('/:id', deleteTag);


export default router;
