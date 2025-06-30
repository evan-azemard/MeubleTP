import express from "express";
import cors from "cors";
import path from "path";

const app = express();
// Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());

// Point d'entrée
app.get("/api", (_req, res) => {
  res.render("index", { title: "Accueil", message: "Bienvenue sur MeubleTP" });
});

export default app;
