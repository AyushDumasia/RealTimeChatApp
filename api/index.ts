import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { configApp } from "./config";

dotenv.config();
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json("Hello, world!");
});

configApp();
