import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Connexion requise" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
};
