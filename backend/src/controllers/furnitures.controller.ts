import { Request, Response } from 'express';
import { Furniture } from '../models';

export const getAllFurnitures = async (_req: Request, res: Response) => {
    const furnitures = await Furniture.find()
        .populate("category")
        .populate("createdBy")
        .populate("materials.materialId")
        .populate("tags");

    res.json(furnitures);
    return;
};

export const getFurnitureById = async (req: Request, res: Response) => {
    const furniture = await Furniture.findById(req.params.id)
        .populate("category")
        .populate("createdBy")
        .populate("materials.materialId")
        .populate("tags");

    if (!furniture) {
        res.status(404).json({ error: "Meuble introuvable" });
        return;
    }

    res.json(furniture);
    return;
};

export const createFurniture = async (req: Request, res: Response) => {
    const { name, quantity, category, materials, tags } = req.body;
    console.log(res.locals.user);
    const createdBy = res.locals.user.userId;

    const furniture = await Furniture.create({
        name,
        quantity,
        category,
        createdBy,
        materials,
        tags
    });

    res.status(201).json(furniture);
    return;
};

export const updateFurniture = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, quantity, category, materials, tags } = req.body;
    const updateData = {
        ...(name && { name }),
        ...(quantity && { quantity }),
        ...(category && { category }),
        ...(materials && { materials }),
        ...(tags && { tags })
    };
    const furniture = await Furniture.findByIdAndUpdate(id, updateData, { new: true })
        .populate("category")
        .populate("createdBy")
        .populate("materials.materialId")
        .populate("tags");


    if (!furniture) {
        res.status(404).json({ error: "Meuble introuvable" });
        return;
    }

    res.json(furniture);
    return;
};

export const deleteFurniture = async (req: Request, res: Response) => {
    const { id } = req.params;

    const furniture = await Furniture.findByIdAndDelete(id);
    if (!furniture) {
        res.status(404).json({ error: "Meuble introuvable" });
        return;
    }

    res.status(204).end();
    return;
};
