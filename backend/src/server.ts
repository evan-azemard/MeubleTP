import "dotenv/config";

import { connectDB } from "./config/db";
connectDB();

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Serveur lancé sur le port :', PORT);
})