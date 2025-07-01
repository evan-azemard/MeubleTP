import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers';

import { validate } from '../middlewares/validate';
import { updateUserSchema } from '../schemas';

const router = Router();

router.get('/',  getAllUsers);
router.get('/:id',  getUserById);
router.patch('/:id',  validate(updateUserSchema), updateUser);
router.delete('/:id',  deleteUser);

export default router;
