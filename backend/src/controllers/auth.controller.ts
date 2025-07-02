import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/password";
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "1h";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      res.status(400).json({ error: "Email déjà utilisé" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    console.error("Register error", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      res.status(400).json({ error: "Identifiants invalides" });
      return;
    }
    const validPassword = await verifyPassword(user.hashedPassword, password);

    if (!validPassword) {
      res.status(400).json({ error: "Identifiants invalides" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({ message: "Connexion réussie" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Déconnexion réussie" });
  return;
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.userId;
    const user = await User.findById(userId).select('email').exec();
    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    } 
    res.json({ email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};