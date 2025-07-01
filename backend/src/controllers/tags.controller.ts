import { Request, Response } from 'express';
import { Tag } from '../models';

export const getAllTags = async (_req: Request, res: Response) => {
  const tags = await Tag.find();
  res.json(tags);
  return;
};

export const getTagById = async (req: Request, res: Response) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag) {
    res.status(404).json({ error: "Tag introuvable" });
    return;
  }
  res.json(tag);
  return;
};

export const createTag = async (req: Request, res: Response) => {
  const { label } = req.body;

  const exists = await Tag.findOne({ label });
  if (exists) {
    res.status(409).json({ error: "Ce tag existe déjà" });
    return;
  }

  const tag = await Tag.create({ label });
  res.status(201).json(tag);
  return;
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { label } = req.body;

  const tag = await Tag.findByIdAndUpdate(id, { label }, { new: true });
  if (!tag) {
    res.status(404).json({ error: "Tag introuvable" });
    return;
  }

  res.json(tag);
  return;
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;

  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) {
    res.status(404).json({ error: "Tag introuvable" });
    return;
  }

  res.status(204).end();
  return;
};
