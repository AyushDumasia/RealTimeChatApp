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

// !POST // SignUp
export const signUp = AsyncHandler(async (req: Request, res: Response) => {
  const { username, phone, password } = req.body;

  try {
    const ValidPhone = await client.query(
      "SELECT * FROM users WHERE phone = $1",
      [phone]
    );

    if (ValidPhone.rows.length > 0) {
      throw new ApiError(409, "Phone already exists");
    }

    const newPassword = await hashPassword(password);

    const q = `INSERT INTO users (username, phone, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [username, phone, newPassword];
    const result = await client.query(q, values);
    const user = result.rows[0];

    const token = generateAccessToken({
      username: user.username,
      phone: user.phone,
      id: user.user_id,
    });

    req.user = {
      username: user.username,
      phone: user.phone,
      id: user.user_id,
    };

    res
      .cookie("userCookie", token, {
        httpOnly: true,
        maxAge: hundredYearsInMilliseconds,
      })
      .status(201) // Changed to 201 for creation
      .json(new ApiResponse(201, user, "User created successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode)
        .json(new ApiResponse(error.statusCode, null, error.message));
    } else {
      res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
});

// !POST // Login
export const login = AsyncHandler(async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  console.log(phone, password);

  const q = await client.query(`SELECT * FROM users WHERE phone = $1`, [phone]);

  const user = q.rows[0];
  console.log(user);

  if (!user) throw new ApiError(404, "User not found");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new ApiError(404, "Invalid password");

  const token = generateAccessToken({
    username: user.username,
    phone: user.phone,
    id: user.user_id,
  });

  req.user = {
    username: user.username,
    phone: user.phone,
    id: user.user_id,
  };

  res
    .cookie("userCookie", token, {
      httpOnly: true,
      maxAge: hundredYearsInMilliseconds,
    })
    .status(201)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});
