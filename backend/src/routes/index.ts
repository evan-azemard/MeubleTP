import express from 'express';
const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/furnitures', furnitureRouter);
router.use('/categories', categoryRouter);
router.use('/materials', materialRouter);
router.use('/companies', companyRouter);
router.use('/tags', tagRouter);
router.use('/stats', statsRouter);

export default router;
