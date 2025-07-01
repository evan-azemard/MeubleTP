import { Request, Response } from 'express';
import { Category } from '../models';

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({ error: "Catégorie introuvable" });
    return;
  }
  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) {
    res.status(409).json({ error: "Nom de catégorie déjà utilisé" });
    return;

  }
  const category = await Category.create({ name });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
  if (!category) {
    res.status(404).json({ error: "Catégorie introuvable" });
    return;

  }
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ error: "Catégorie introuvable" });
    return;
  }
  res.status(204).end();
};
