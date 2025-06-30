import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from "./config/db";
dotenv.config();
connectDB();

const app = express();

// pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.render('index', { title: 'Accueil', message: 'Bienvenue sur MeubleTP' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Serveur lancé sur le port :', PORT);
})