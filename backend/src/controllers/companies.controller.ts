import { Request, Response } from 'express';
import { Company } from '../models';

export const getAllCompanies = async (_req: Request, res: Response) => {
  const companies = await Company.find();
  res.json(companies);
  return;
};

export const getCompanyById = async (req: Request, res: Response) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    res.status(404).json({ error: "Entreprise introuvable" });
    return;
  }
  res.json(company);
  return;
};

export const createCompany = async (req: Request, res: Response) => {
  const { name } = req.body;

  const exists = await Company.findOne({ name });
  if (exists) {
    res.status(409).json({ error: "Nom d'entreprise déjà utilisé" });
    return;
  }

  const company = await Company.create({ name });
  res.status(201).json(company);
  return;
};

export const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const company = await Company.findByIdAndUpdate(id, { name }, { new: true });
  if (!company) {
    res.status(404).json({ error: "Entreprise introuvable" });
    return;
  }

  res.json(company);
  return;
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;

  const company = await Company.findByIdAndDelete(id);
  if (!company) {
    res.status(404).json({ error: "Entreprise introuvable" });
    return;
  }

  res.status(204).end();
  return;
};
