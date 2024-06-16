import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connectPostgres } from "./Postgres/config";
import userRoutes from "./src/route/user.route";
import dotenv from "dotenv";
import { createTable } from "./src/model/user.schema";

const app = express();

export const configApp = async () => {
  dotenv.config();

  app.use(express.json());
  app.use(bodyParser.urlencoded());
  app.use(morgan("dev"));

  createTable();

  app.get("/", (req: Request, res: Response) => {
    res.send("/ Get Route");
  });

  app.use("/api/v1/auth", userRoutes);

  app.listen(3000, () => {
    console.log(`App is running  on http://localhost:3000/api/v1/`);
    connectPostgres();
  });
};
