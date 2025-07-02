import express from "express";
import path from "path";
import apiRouter from "./routes/api.routes";
import viewRouter from "./routes/view.routes";
import cookieParser from 'cookie-parser';
import type { RequestHandler } from 'express';
const expressLayouts: RequestHandler = require('express-ejs-layouts');


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "./layouts/main");

app.use(express.static(path.join(__dirname, "..", "public")));

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Point d'entrée
app.use("/", viewRouter);
app.use('/api', apiRouter);


app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(500).json({
        error: "Erreur interne du serveur",
        message: err.message ?? "Une erreur inconnue est survenue.",
    });
});




export default app;
