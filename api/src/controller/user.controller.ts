import { Request, Response } from "express";
import client from "../../Postgres/config";
import { AsyncHandler } from "../utils/AsyncHandler.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import { hashPassword } from "../Hooks/hashedPassword.hook";

export const getAllUser = AsyncHandler(async (req: Request, res: Response) => {
  const user = await client.query("SELECT * FROM users");

  if (!user.rows || user.rows.length <= 0) {
    throw new ApiError(404, "No Users found");
  }

  res.json(new ApiResponse(200, user.rows));
});

export const signUp = AsyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const validEmail = await client.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  console.log(validEmail.rows);

  if (validEmail.rows.length > 0) {
    throw new ApiError(409, "Email already exists");
  }

  const newPassword = await hashPassword(password);
  console.log(newPassword);

  const q =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
  const value = [username, email, newPassword];
  const result = await client.query(q, value);

  res.json(new ApiResponse(200, result.rows[0]));
});
