import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.render('index', { title: 'Accueil', message: 'Bienvenue sur MeubleTP' });
});
 
export default router;
