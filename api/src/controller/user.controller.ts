import { Request, Response } from "express";
import client from "../../Postgres/config";
import { AsyncHandler } from "../utils/AsyncHandler.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import { hashPassword } from "../Hooks/hashedPassword.hook";
import { generateAccessToken } from "../Hooks/generateAccessToken";
import bcrypt from "bcryptjs";

const hundredYearsInMilliseconds = 100 * 365.25 * 24 * 60 * 60 * 1000;

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

// !GET // GetAllUsers
export const getAllUser = AsyncHandler(async (req: Request, res: Response) => {
  const user = await client.query("SELECT * FROM users");

  if (!user.rows || user.rows.length <= 0) {
    throw new ApiError(404, "No Users found");
  }

  res.json(new ApiResponse(200, user.rows));
});

// !POST // !SignUp
export const signUp = AsyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const validEmail = await client.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (validEmail.rows.length > 0) {
    throw new ApiError(409, "Email already exists");
  }

  const newPassword = await hashPassword(password);

  const q =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
  const value = [username, email, newPassword];
  const result = await client.query(q, value);
  const user = result.rows[0];

  const token = generateAccessToken({
    username: user.username,
    email: user.email,
    id: user.id,
  });

  req.user = {
    username: user.username,
    email: user.email,
    id: user.id,
  };

  res
    .cookie("userCookie", token, {
      httpOnly: true,
      maxAge: hundredYearsInMilliseconds,
    })
    .status(201)
    .json(new ApiResponse(200, user, "User created successfully"));
});

// !POST // !Login
export const login = AsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const q = await client.query("SELECT * FROM users WHERE email= $1 ", [email]);

  const user = q.rows[0];

  if (!user) throw new ApiError(404, "User not found");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new ApiError(404, "Invalid password");

  const token = generateAccessToken({
    username: user.username,
    email: user.email,
    id: user.id,
  });

  req.user = {
    username: user.username,
    email: user.email,
    id: user.id,
  };

  res
    .cookie("userCookie", token, {
      httpOnly: true,
      maxAge: hundredYearsInMilliseconds,
    })
    .status(201)
    .json(new ApiResponse(200, user, "User created successfully"));
});
