import express from "express";
import path from "path";
import apiRouter from "./routes/api.routes";
import indexRouter from "./routes/index.routes";
import cookieParser from 'cookie-parser';

const app = express();


// Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Point d'entrée
app.use('/', indexRouter); 

app.use('/api', apiRouter);

export default app;
