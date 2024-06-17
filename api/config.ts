import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connectPostgres } from "./Postgres/config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createTable } from "./src/model/user.schema";
import { createMessageSchema } from "./src/model/message.schema";

import userRoutes from "./src/route/user.route";
import messageRoutes from "./src/route/message.route";

export const configApp = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  dotenv.config();

  app.use(express.json());
  app.use(bodyParser.urlencoded());
  app.use(morgan("dev"));
  app.use(cookieParser());

  createTable();
  createMessageSchema();

  app.get("/", (req: Request, res: Response) => {
    res.send("/ Get Route");
  });

  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/message", messageRoutes);

  app.listen(PORT, () => {
    console.log(`App is running  on http://localhost:${PORT}/api/v1/`);
    connectPostgres();
  });
};
