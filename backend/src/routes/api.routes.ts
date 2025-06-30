import express from 'express';
import usersRouter from './users.routes';
import authRouter from './auth.routes';
import materialsRouter from './materials.routes';
import companiesRouter from './companies.routes';
import tagsRouter from './tags.routes';
import statsRouter from './stats.routes';
import furnituresRouter from './furnitures.routes';
import categoriesRouter from './categories.routes';

const router = express.Router();


router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/furnitures', furnituresRouter);
router.use('/categories', categoriesRouter);
router.use('/materials', materialsRouter);
router.use('/companies', companiesRouter);
router.use('/tags', tagsRouter);
router.use('/stats', statsRouter);


export default router;