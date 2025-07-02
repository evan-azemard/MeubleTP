import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  if (!token) {
     res.status(401).json({ error: "Connexion requise" });
     next();
     return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch {
     res.status(401).json({ error: "Token invalide" });
     return;
  }
};
