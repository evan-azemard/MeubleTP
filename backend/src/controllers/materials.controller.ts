import { Request, Response } from 'express';
import { Material } from '../models';

export const getAllMaterials = async (_req: Request, res: Response) => {
  const materials = await Material.find().populate("company");
  res.json(materials);
  return;
};

export const getMaterialById = async (req: Request, res: Response) => {
  const material = await Material.findById(req.params.id).populate("company");
  if (!material) {
    res.status(404).json({ error: "Matériau introuvable" });
    return;
  }
  res.json(material);
  return;
};

export const createMaterial = async (req: Request, res: Response) => {
  const { name, company, type } = req.body;

  const exists = await Material.findOne({ name });
  if (exists) {
    res.status(409).json({ error: "Nom de matériau déjà utilisé" });
    return;
  }

  const material = await Material.create({ name, company, type });
  res.status(201).json(material);
  return;
};

export const updateMaterial = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, company, type } = req.body;

  const material = await Material.findByIdAndUpdate(
    id,
    { name, company, type },
    { new: true }
  );

  if (!material) {
    res.status(404).json({ error: "Matériau introuvable" });
    return;
  }

  res.json(material);
  return;
};

export const deleteMaterial = async (req: Request, res: Response) => {
  const { id } = req.params;

  const material = await Material.findByIdAndDelete(id);
  if (!material) {
    res.status(404).json({ error: "Matériau introuvable" });
    return;
  }

  res.status(204).end();
  return;
};
