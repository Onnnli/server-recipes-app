import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import multer from 'multer';
import path from 'path';


import api from './api/index.js';
import { notFound, errorHandler } from './middlewares.js'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/public/images', express.static('./public/images'))



app.get("/", (req, res) => {
    res.json({
        message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    });
});

app.use("/", api);

app.use(notFound);
app.use(errorHandler);

export default app;