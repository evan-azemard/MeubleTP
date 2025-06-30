import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("URI introuvable");
        process.exit(1);
    }
    try {
        await mongoose.connect(uri)
        console.log('Connexion réussi à la bdd');
    } catch (error) {
        console.error('Erreur dans la connexion à la bdd', error);
        process.exit(1);

    }
}