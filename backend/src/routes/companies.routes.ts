import { Router } from 'express';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controllers';

const router = Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;
