import { Request, Response } from "express";
import client from "../../Postgres/config";

export const getAllUser = async (req: Request, res: Response) => {
  const user = await client.query("SELECT * FROM users");

  res.json(user.rows);
};

export const addUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  console.log(username, email);
  const validEmail = await client.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (validEmail.rows) {
    return res.json("Email already in use");
  }
  const q = "INSERT INTO users (username, email) VALUES ($1,$2)";
  const value = [username, email];
  await client.query(q, value);

  res.json(value);
};
