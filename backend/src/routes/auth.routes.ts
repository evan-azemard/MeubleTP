import { isAuthenticated } from './../middlewares/isAuthenficated';
import { Router } from 'express';
import { login, register, logout, me } from '../controllers';
import { validate } from '../middlewares/validate';
import { registerUserSchema, loginUserSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/login', validate(loginUserSchema), login);
router.post('/register', validate(registerUserSchema), register);
router.post('/logout', logout);
router.get('/me',isAuthenticated, me);


export default router;
