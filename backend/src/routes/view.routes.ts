import { Router, Request, Response } from 'express';

const router = Router();

// Pages générales
router.get('/', (_req: Request, res: Response) => {
  res.render('index', { title: 'Accueil', message: 'Bienvenue sur MeubleTP' });
});

router.get('/charts', (_req: Request, res: Response) => {
  res.render('charts', { title: 'Statistiques' });
});

router.get('/tables', (_req: Request, res: Response) => {
  res.render('tables', { title: 'Tableaux' });
});

// Layouts
router.get('/layout-static', (_req: Request, res: Response) => {
  res.render('layout-static', { title: 'Navigation statique' });
});

router.get('/layout-sidenav-light', (_req: Request, res: Response) => {
  res.render('layout-sidenav-light', { title: 'Sidenav clair' });
});

// Auth
router.get('/login', (_req: Request, res: Response) => {
  res.render('login', { title: 'Connexion' });
});

router.get('/register', (_req: Request, res: Response) => {
  res.render('register', { title: 'Inscription' });
});

router.get('/password', (_req: Request, res: Response) => {
  res.render('password', { title: 'Mot de passe oublié' });
});

// Pages d’erreurs
router.get('/401', (_req: Request, res: Response) => {
  res.status(401).render('401', { title: 'Erreur 401' });
});

router.get('/404', (_req: Request, res: Response) => {
  res.status(404).render('404', { title: 'Erreur 404' });
});

router.get('/500', (_req: Request, res: Response) => {
  res.status(500).render('500', { title: 'Erreur 500' });
});


router.get('/categories', (_req: Request, res: Response) => {
  res.render('categories', { title: 'categories' });

});
router.get('/companies', (_req: Request, res: Response) => {
  res.render('companies', { title: 'companies' });

});
router.get('/materials', (_req: Request, res: Response) => {
  res.render('materials', { title: 'materials' });

});
router.get('/furnitures', (_req: Request, res: Response) => {
  res.render('furnitures', { title: 'furnitures' });

});
router.get('/tags', (_req: Request, res: Response) => {
  res.render('tags', { title: 'tags' });

});


export default router;
