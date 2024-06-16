import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import client, { connectPostgres } from "./Postgres/config";
import userRoutes from "./src/route/user.route";
import path from "path";
import fs from "fs";
import { createTable } from "./src/model/user.schema";

const app = express();

export const configApp = async () => {
  app.use(express.json());
  app.use(bodyParser.urlencoded());
  app.use(morgan("dev"));

  // const filePath = path.join(__dirname, "src", "model", "user.schema.sql");
  // const sql = fs.readFileSync(filePath, "utf-8");
  // await client.query(sql);
  createTable();
  // console.log("Table created successfully");

  app.use("/api/v1/auth", userRoutes);

  app.listen(3000, () => {
    console.log(`App is running  on http://localhost:3000`);
    connectPostgres();
  });
};
