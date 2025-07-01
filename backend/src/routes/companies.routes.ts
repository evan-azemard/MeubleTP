import { Router } from 'express';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controllers';
import { validate } from '../middlewares/validate';
import { createCompanySchema, updateCompanySchema } from '../schemas';

const router = Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);

router.post('/', validate(createCompanySchema), createCompany);
router.put('/:id', validate(updateCompanySchema), updateCompany);
router.delete('/:id', deleteCompany);


export default router;
