import { Request, Response } from 'express';
import { User } from '../models';

export const getAllUsers = async (_req: Request, res: Response) => {
    const users = await User.find().select("-hashedPassword");
    res.json(users);
    return;
};

export const getUserById = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select("-hashedPassword");
    if (!user) {
        res.status(404).json({ error: "Utilisateur introuvable" });
        return;
    }
    res.json(user);
    return;
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email } = req.body;

    if (res.locals.user.id !== id) {
        res.status(403).json({ error: "Accès interdit" });
        return;
    }

    if (!email) {
        res.status(400).json({ error: "L'email est requis" });
        return;
    }

    const user = await User.findByIdAndUpdate(id, { email }, { new: true }).select("-hashedPassword");

    if (!user) {
        res.status(404).json({ error: "Utilisateur introuvable" });
        return;
    }

    res.json(user);
    return;
};


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(404).json({ error: "Utilisateur introuvable" });
        return;
    }

    res.status(204).end();
    return;
};
