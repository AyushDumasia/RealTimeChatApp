import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connectPostgres } from "./Postgres/config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createTable } from "./src/model/user.schema";
import { createMessageSchema } from "./src/model/message.schema";
import { createContactSchema } from "./src/model/contact.schema";

import userRoutes from "./src/route/user.route";
import messageRoutes from "./src/route/message.route";
import contactRoutes from "./src/route/contact.route";

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
  createContactSchema();

  app.get("/", (req: Request, res: Response) => {
    res.send("/ Get Route");
  });

  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/message", messageRoutes);
  app.use("/api/v1/contact", contactRoutes);

  app.listen(PORT, () => {
    console.log(`App is running  on http://localhost:${PORT}/api/v1/`);
    connectPostgres();
  });
};
